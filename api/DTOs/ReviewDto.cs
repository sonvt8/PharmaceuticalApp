﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public bool IsApproved { get; set; }
        public string ProductName { get; set; }
    }
}