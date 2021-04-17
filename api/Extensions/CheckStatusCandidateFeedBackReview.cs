using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class CheckStatusCandidateFeedBackReview
    {
        public static string GetStatus(this bool? approved)
        {
            if (approved == null)
                return "Pending";
            else if (approved == false)
                return "Rejected";
            else
                return "Approved";
        }
    }
}
