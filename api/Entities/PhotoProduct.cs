using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class PhotoProduct
    {
        public int Id { get; set; }
        public string PhotoProductUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
