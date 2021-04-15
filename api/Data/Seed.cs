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
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            // Seed Users
            //if (await userManager.Users.AnyAsync())
            //    return;
            //var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            //var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            //if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole {Name="Member"},
                new AppRole {Name="Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            //foreach (var user in users)
            //{
            //    user.UserName = user.UserName.ToLower();
            //    await userManager.CreateAsync(user, "123Admin!@#");
            //    await userManager.AddToRoleAsync(user, "Member");
            //}
            var admin = new AppUser
            {
                Email = "admin@gmail.com",
                UserName = "Admin"
            };

            await userManager.CreateAsync(admin, "123Admin!@#");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
    
}

