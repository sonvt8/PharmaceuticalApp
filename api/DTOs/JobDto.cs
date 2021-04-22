﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class JobDto
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
    }
}