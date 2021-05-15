using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class DownloadDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int AppUserId { get; set; }
    }
}
