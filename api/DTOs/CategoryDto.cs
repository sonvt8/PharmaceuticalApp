using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public string PhotoCategoryUrl { get; set; }
        public ICollection<PhotoCategoryDto> PhotoCategories { get; set; }
    }
}
