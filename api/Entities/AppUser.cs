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
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public ICollection<CandidateJob> CandidateJobs { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
