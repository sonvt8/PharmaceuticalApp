using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class PhotoCategoryDto
    {
        public int Id { get; set; }
        public string PhotoCategoryUrl { get; set; }
        public bool IsMain { get; set; }
    }
}
