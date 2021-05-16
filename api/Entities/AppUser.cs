using api.Data;
using api.Extensions;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string StreetAddress { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Degree { get; set; }
        public string Experience { get; set; }
        public bool? IsApproved { get; set; } = null;
        public bool IsApplied { get; set; } = false;

        public Job Job { get; set; }
        public int? JobId { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }

        public string GetStatus()
        {
            return IsApproved.GetStatus();
        }

        public ICollection<FeedBack> FeedBacks { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<PhotoUser> PhotoUsers { get; set; }
        public ICollection<Download> Downloads { get; set; }
    }
}
