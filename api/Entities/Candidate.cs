using api.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Candidate
    {
        public int Id { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }

        public Job Job { get; set; }
        public int JobId { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
