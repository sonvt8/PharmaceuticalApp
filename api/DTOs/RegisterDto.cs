﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string StreetAddress { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
