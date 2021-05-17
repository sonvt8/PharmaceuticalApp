using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CareerProfileDto
    {
        public int? Id { get; set; }
        public string JobName { get; set; }
        public int Salary { get; set; }
        public string Location { get; set; }
        public bool? IsApproved { get; set; }
        public int AppUserId { get; set; }
    }
}
