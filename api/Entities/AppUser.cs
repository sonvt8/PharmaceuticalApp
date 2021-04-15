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
        public string StreetAddress { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<FeedBack> FeedBacks { get; set; }
        public ICollection<Candidate> Candidates { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }      
    }
}
