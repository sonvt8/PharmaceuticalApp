using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class PhotoUserDto
    {
        public int Id { get; set; }
        public string PhotoUserUrl { get; set; }
        public bool IsMain { get; set; }
    }
}
