using Microsoft.AspNetCore.Mvc;
using User_Service.Services;
using User_Service.Models;
using System;
using System.Threading.Tasks;

namespace User_Service.Controllers
{
    [ApiController]
    [Route("api/subscriptions")]
    public class SubscriptionController : ControllerBase
    {
        private readonly UserService _userService;

        public SubscriptionController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] Subscription subscription)
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
        public async Task<IActionResult> UpdateSubscription(int id, [FromBody] Subscription updatedSubscription)
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
    }
}
