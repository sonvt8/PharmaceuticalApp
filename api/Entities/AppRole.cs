using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace api.Data
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}