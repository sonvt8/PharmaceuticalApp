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
        public string Location { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }
        public DateTime Deadline { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }

        public ICollection<CandidateJob> CandidateJobs { get; set; }
    }
}
