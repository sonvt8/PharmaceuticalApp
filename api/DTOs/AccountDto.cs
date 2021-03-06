using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class AccountDto
    {
        public int? Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Gender { get; set; }
        public string StreetAddress { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string State { get; set; } = "";
        public string City { get; set; } = "";
        public string Country { get; set; } = "";
        public string Zip { get; set; } = "";
        public string Degree { get; set; } = "";
        public int? JobId { get; set; }
        public JobDto Job { get; set; } = null;
        public string PhotoUserUrl { get; set; } = "";
        public int? PhotoUserId { get; set; }
        public bool? IsApproved { get; set; } = null;
    }
}
