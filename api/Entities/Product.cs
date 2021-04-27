using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }      
        public string OutPut { get; set; }
        public string CapsuleSize { get; set; }
        public string MachineDimension { get; set; }
        public string ShippingWeight { get; set; }
        public int ModelNumber { get; set; }
        public int Dies { get; set; }
        public int MaxPressure { get; set; }
        public int MaxDiameter { get; set; }
        public int MaxDepth { get; set; }
        public string ProductionCapacity { get; set; }
        public string MachineSize { get; set; }
        public int NetWeight { get; set; }

        public ICollection<PhotoProduct> PhotoProducts { get; set; }
        public ICollection<Review> Reviews { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}