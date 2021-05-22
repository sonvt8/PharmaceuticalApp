using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class PhotoCategory
    {
        public int Id { get; set; }
        public string PhotoCategoryUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
