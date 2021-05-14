using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Download
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
