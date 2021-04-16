using api.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Job
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }

        public string GetStatus()
        {
            return IsAvailable.GetStatusJob();
        }

        public ICollection<AppUser> AppUsers { get; set; }
    }
}
