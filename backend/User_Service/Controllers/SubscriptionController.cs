    using Microsoft.AspNetCore.Mvc;
    using User_Service.Services;
    using User_Service.Models;
    using System;
    using System.Threading.Tasks;
    using Stripe;
    using Stripe.Checkout;

    using StripeSubscription = Stripe.Subscription;
    using UserSubscription = User_Service.Models.Subscription;


    namespace User_Service.Controllers
    {
        [ApiController]
        [Route("api/subscriptions")]
        public class SubscriptionController : ControllerBase
        {
            private readonly UserService _userService;
            private readonly IConfiguration _configuration;

            public SubscriptionController(UserService userService, IConfiguration configuration)
            {
                _configuration = configuration;
                _userService = userService;
                StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];
            }

            [HttpPost]
            public async Task<IActionResult> CreateSubscription([FromBody] UserSubscription subscription)
            {
                if (subscription == null)
                {
                    return BadRequest("Subscription data is required.");
                }

                try
                {
                    var createdSubscription = await _userService.CreateSubscriptionAsync(subscription.UserId, subscription.SubscriptionPlanId, subscription.StartDate, subscription.EndDate, true); // Set subscription active
                    return CreatedAtAction(nameof(GetSubscriptionById), new { id = createdSubscription.SubscriptionId }, createdSubscription);
                }
                catch (Exception ex)
                {
                    return NotFound(ex.Message); // Return error if user or plan is not found
                }
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetSubscriptionById(int id)
            {
                var subscription = await _userService.GetSubscriptionByIdAsync(id);
                if (subscription == null)
                {
                    return NotFound();
                }
                return Ok(subscription);
            }

            [HttpGet("user/{userId}")]
            public async Task<IActionResult> GetSubscriptionsByUserId(int userId)
            {
                var subscriptions = await _userService.GetUserSubscriptionsAsync(userId);
                if (subscriptions == null || subscriptions.Count == 0)
                {
                    return NotFound($"No subscriptions found for User ID {userId}.");
                }
                return Ok(subscriptions);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateSubscription(int id, [FromBody] UserSubscription updatedSubscription)
            {
                if (updatedSubscription == null)
                {
                    return BadRequest("Subscription data is required.");
                }

                var subscription = await _userService.GetSubscriptionByIdAsync(id);
                if (subscription == null)
                {
                    return NotFound($"Subscription with ID {id} not found.");
                }

                // Add the missing parameters (startDate, endDate, and isActive) here
                await _userService.UpdateSubscriptionAsync(id, updatedSubscription.SubscriptionPlanId, updatedSubscription.StartDate, updatedSubscription.EndDate);
                
                return NoContent(); // 204 No Content
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteSubscription(int id)
            {
                var subscription = await _userService.GetSubscriptionByIdAsync(id);
                if (subscription == null)
                {
                    return NotFound($"Subscription with ID {id} not found.");
                }

                await _userService.DeleteSubscriptionAsync(id);
                return NoContent(); // 204 No Content
            }







            
            [HttpPost("create-checkout-session")]
            public IActionResult CreateCheckoutSession([FromBody] SubscriptionPlan subscriptionPlan)
            {
                var domain = "http://localhost:3000"; // React app URL

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>
                    {
                        new SessionLineItemOptions
                        {
                            Price = subscriptionPlan.ProductId, // Use ProductId property here
                            Quantity = 1,
                        },
                    },
                    Mode = "payment",
                    SuccessUrl = $"{domain}/success",
                    CancelUrl = $"{domain}/profile/settings",
                };

                var service = new SessionService();
                Session session = service.Create(options);

                return Ok(new { sessionId = session.Id });
            }


            [HttpPost("create-portal-session")]
            public ActionResult CreatePortalSession()
            {
                var checkoutService = new SessionService();
                var checkoutSession = checkoutService.Get(Request.Form["session_id"]);

                var returnUrl = "http://localhost:4242";

                var options = new Stripe.BillingPortal.SessionCreateOptions
                {
                    Customer = checkoutSession.CustomerId,
                    ReturnUrl = returnUrl,
                };
                var service = new Stripe.BillingPortal.SessionService();
                var session = service.Create(options);

                Response.Headers.Add("Location", session.Url);
                return new StatusCodeResult(303);
            }

            [HttpPost("webhook")]
            public async Task<IActionResult> Webhook()
            {
                var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

                const string endpointSecret = "whsec_12345";
                try
                {
                    var stripeEvent = EventUtility.ParseEvent(json);
                    var signatureHeader = Request.Headers["Stripe-Signature"];
                    stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, endpointSecret);

                    switch (stripeEvent.Type)
                    {
                        case EventTypes.CustomerSubscriptionDeleted:
                            var subscriptionDeleted = stripeEvent.Data.Object as StripeSubscription;
                            Console.WriteLine("Subscription canceled: " + subscriptionDeleted.Id);
                            break;

                        case EventTypes.CustomerSubscriptionUpdated:
                            var subscriptionUpdated = stripeEvent.Data.Object as StripeSubscription;
                            Console.WriteLine("Subscription updated: " + subscriptionUpdated.Id);
                            break;

                        case EventTypes.CustomerSubscriptionCreated:
                            var subscriptionCreated = stripeEvent.Data.Object as StripeSubscription;
                            Console.WriteLine("Subscription created: " + subscriptionCreated.Id);
                            break;

                        case EventTypes.CustomerSubscriptionTrialWillEnd:
                            var trialEndSubscription = stripeEvent.Data.Object as StripeSubscription;
                            Console.WriteLine("Subscription trial will end: " + trialEndSubscription.Id);
                            break;

                        // case EventTypes.ActiveEntitlementSummaryUpdated:
                        //     var summary = stripeEvent.Data.Object as ActiveEntitlementSummary;
                        //     Console.WriteLine("Entitlement updated for customer: " + summary.Customer);
                        //     break;

                        default:
                            Console.WriteLine("Unhandled event type: " + stripeEvent.Type);
                            break;
                    }
                    return Ok();
                }
                catch (StripeException e)
                {
                    Console.WriteLine("Stripe error: " + e.Message);
                    return BadRequest();
                }
            }
        }
    }
