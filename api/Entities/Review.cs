using api.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public int Rating { get; set; }
        public bool? IsApproved { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }

        public string GetStatus()
        {
            return IsApproved.GetStatus();
        }
    }
}
