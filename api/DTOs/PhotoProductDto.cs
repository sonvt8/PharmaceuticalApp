using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class PhotoProductDto
    {
        public int Id { get; set; }
        public string PhotoProductUrl { get; set; }
        public bool IsMain { get; set; }
    }
}
