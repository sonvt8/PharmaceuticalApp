using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class CheckStatusJob
    {
        public static string GetStatusJob(this bool isAvailable)
        {
            if (isAvailable == true)
                return "Available";
            else
                return "Expired";
        }
    }
}
