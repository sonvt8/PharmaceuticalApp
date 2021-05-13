using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace api.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext _context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            // Seed Categories
            if (await _context.Categories.AnyAsync())
                return;

            var categoryData = await System.IO.File.ReadAllTextAsync("Data/CategorySeedData.json");

            var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

            if (categories == null)
                return;

            foreach (var category in categories)
            {
                _context.Categories.Add(category);
            }
            await _context.SaveChangesAsync();

            // Seed Job
            if (await _context.Jobs.AnyAsync())
                return;

            var jobData = await System.IO.File.ReadAllTextAsync("Data/JobSeedData.json");

            var jobs = JsonSerializer.Deserialize<List<Job>>(jobData);

            if (jobs == null)
                return;

            foreach (var job in jobs)
            {
                _context.Jobs.Add(job);
            }
            await _context.SaveChangesAsync();

            // Seed Users
            if (await userManager.Users.AnyAsync())
                return;
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole {Name="Member"},
                new AppRole {Name="Admin"},
                new AppRole {Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                //using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.Email = user.Email;
                await userManager.CreateAsync(user, "password");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                Email = "admin@gmail.com",
                UserName = "Admin",
                EmailConfirmed = true,
                FullName = "Admin"
            };

            await userManager.CreateAsync(admin, "123Admin!@#");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
    
}

