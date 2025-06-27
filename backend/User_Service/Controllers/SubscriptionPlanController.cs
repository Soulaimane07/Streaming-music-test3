using Microsoft.AspNetCore.Mvc;
using User_Service.Services;
using User_Service.Models;
using System.Threading.Tasks;

namespace User_Service.Controllers
{
    [ApiController]
    [Route("api/subscriptionplans")]
    public class SubscriptionPlanController : ControllerBase
    {
        private readonly UserService _userService;

        public SubscriptionPlanController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscriptionPlan([FromBody] SubscriptionPlan plan)
        {
            if (plan == null)
            {
                return BadRequest("Subscription Plan data is required.");
            }

            var createdPlan = await _userService.CreateSubscriptionPlanAsync(plan);
            return CreatedAtAction(nameof(GetSubscriptionPlanById), new { id = createdPlan.SubscriptionPlanId }, createdPlan);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubscriptionPlanById(int id)
        {
            var plan = await _userService.GetSubscriptionPlanByIdAsync(id);
            return plan != null ? Ok(plan) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubscriptionPlans()
        {
            var plans = await _userService.GetAllSubscriptionPlansAsync();
            return Ok(plans);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubscriptionPlan(int id, [FromBody] SubscriptionPlan updatedPlan)
        {
            if (updatedPlan == null)
            {
                return BadRequest("Subscription Plan data is required.");
            }

            await _userService.UpdateSubscriptionPlanAsync(id, updatedPlan);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriptionPlan(int id)
        {
            await _userService.DeleteSubscriptionPlanAsync(id);
            return NoContent();
        }
    }
}
