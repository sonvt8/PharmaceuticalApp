﻿using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class CandidateCreateDto
    {
        public string PhotoUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string StreetAddress { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Degree { get; set; }
        public string Experience { get; set; }
        public bool? IsApprove { get; set; } = null;
        public bool IsApplied { get; set; } = true;
        public Job Job { get; set; }
    }
}
