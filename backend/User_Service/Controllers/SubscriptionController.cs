using Microsoft.AspNetCore.Mvc;
using User_Service.Services;
using User_Service.Models;

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

        // Create a new subscription
        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] Subscription subscription)
        {
            if (subscription == null)
            {
                return BadRequest("Subscription data is required.");
            }

            // Ensure that the user exists and create the subscription
            try
            {
                var createdSubscription = await _userService.CreateSubscriptionAsync(subscription);
                return CreatedAtAction(nameof(GetSubscriptionById), new { id = createdSubscription.SubscriptionId }, createdSubscription);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message); // Return error if user is not found
            }
        }

        // Get a subscription by ID
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

        // Get all subscriptions for a specific user
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

        // Update a subscription
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

            await _userService.UpdateSubscriptionAsync(id, updatedSubscription);
            return NoContent(); // 204 No Content
        }

        // Delete a subscription
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
