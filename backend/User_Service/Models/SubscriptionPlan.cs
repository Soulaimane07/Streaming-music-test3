using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace User_Service.Models
{
    public class SubscriptionPlan
    {
        public required int SubscriptionPlanId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string DescriptionText { get; set; }
        public required string Color { get; set; }
        public required string Image { get; set; }
        public required string ProductId { get; set; }
    }
}