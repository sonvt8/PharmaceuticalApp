using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string PhoneNumber { get; set; }
        public string PhotoUserUrl { get; set; }
        public string StreetAddress { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }

        public ICollection<string> Roles { get; set; }
        public ICollection<PhotoUserDto> PhotoUsers { get; set; }
        public ICollection<FeedBackDto> Feedbacks { get; set; }
    }
}
