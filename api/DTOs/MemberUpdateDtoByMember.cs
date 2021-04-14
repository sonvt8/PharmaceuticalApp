using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class MemberUpdateDtoByMember
    {
        public string Fullname { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string Postalcode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}
