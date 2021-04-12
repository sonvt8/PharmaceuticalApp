using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CandidateJob> CandidateJobs { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CandidateJob>()
                        .HasKey(cj => new { cj.AppUserId, cj.JobId });
            builder.Entity<AppUser>()
                .HasMany(cj => cj.CandidateJobs)
                .WithOne(u => u.AppUser)
                .HasForeignKey(ur => ur.AppUserId)
                .IsRequired();

            builder.Entity<Job>()
                .HasMany(cj => cj.CandidateJobs)
                .WithOne(u => u.Job)
                .HasForeignKey(j => j.JobId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();


        }

    }
}
