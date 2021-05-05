using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class AvailableJobDto
    {
        public int Total { get; set; }
        public int Available { get; set; }
        public int Expired { get; set; }
        public List<Job> Jobs { get; set; }
    }
}
