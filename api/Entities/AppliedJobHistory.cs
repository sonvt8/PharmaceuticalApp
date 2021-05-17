using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class AppliedJobHistory
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public int Salary { get; set; }
        public string Location { get; set; }
        public bool? IsApproved { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
