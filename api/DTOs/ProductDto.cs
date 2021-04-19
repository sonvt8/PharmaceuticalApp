using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
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
        public string ProductName { get; set; }
        public string CategoryName { get; set; }
        public string PhotoProductUrl { get; set; }

        public ICollection<PhotoProductDto> PhotoProducts { get; set; }
    }
}
