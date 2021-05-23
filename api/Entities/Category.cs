using System.Collections.Generic;

namespace api.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<PhotoCategory> PhotoCategories { get; set; }
    }
}
