using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class JobParams : PaginationParams
    {
        public int MaxSalary { get; set; } = 50000;
        public int MinSalary { get; set; } = 100;
    }
}
