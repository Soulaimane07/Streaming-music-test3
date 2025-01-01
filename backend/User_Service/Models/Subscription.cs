using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using User_Service.Models;

namespace User_Service.Models
{
    public class Subscription
    {
        public int SubscriptionId { get; set; }  // No need to mark this as required if it's auto-generated.
        
        public required int UserId { get; set; }
        public required User User { get; set; }

        public required int SubscriptionPlanId { get; set; }
        public required SubscriptionPlan SubscriptionPlan { get; set; }

        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
    }


    public class UserSubscription
    {
        public int SubscriptionId { get; set; }  // No need to mark this as required if it's auto-generated.
        public required int UserId { get; set; }
        public required int SubscriptionPlanId { get; set; }

        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
    }
}
