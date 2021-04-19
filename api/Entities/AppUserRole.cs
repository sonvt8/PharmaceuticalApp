using api.Entities;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}