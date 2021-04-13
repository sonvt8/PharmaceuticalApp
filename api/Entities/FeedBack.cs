using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class FeedBack
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Comments { get; set; }
        public bool IsApprove { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
