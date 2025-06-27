using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using User_Service.Data;
using User_Service.Models;

namespace User_Service.Services
{
    public class UserService
    {
        private readonly UserDbContext _context;




        public UserService(UserDbContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task UpdateUserAsync(int id, User updatedUser)
        {
            var user = await GetUserByIdAsync(id);
            if (user != null)
            {
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.Password = updatedUser.Password;
                user.ProfilePictureUrl = updatedUser.ProfilePictureUrl;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }






        public async Task<Subscription> CreateSubscriptionAsync(int userId, int subscriptionPlanId, DateTime startDate, DateTime endDate, bool isActive)
        {
            // Fetch the user by userId
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} not found.");
            }

            // Fetch the subscription plan by subscriptionPlanId
            var subscriptionPlan = await _context.SubscriptionPlans.FirstOrDefaultAsync(sp => sp.SubscriptionPlanId == subscriptionPlanId);
            if (subscriptionPlan == null)
            {
                throw new Exception($"Subscription Plan with ID {subscriptionPlanId} not found.");
            }

            // Create the subscription
            var subscription = new Subscription
            {
                UserId = userId,
                SubscriptionPlanId = subscriptionPlanId,
                StartDate = startDate,
                EndDate = endDate,
                User = user,
                SubscriptionPlan = subscriptionPlan
            };

            // Add to the database
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return subscription;
        }

        public async Task<Subscription> GetSubscriptionByIdAsync(int id)
        {
            var subscription = await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.SubscriptionId == id);
            if (subscription == null)
            {
                throw new Exception($"Subscription with ID {id} not found.");
            }
            return subscription;
        }

        public async Task<List<Subscription>> GetUserSubscriptionsAsync(int userId)
        {
            return await _context.Subscriptions
                .Where(s => s.UserId == userId)
                .Include(s => s.SubscriptionPlan)  // Include SubscriptionPlan details
                .ToListAsync();
        }

        public async Task UpdateSubscriptionAsync(int id, int subscriptionPlanId, DateTime startDate, DateTime endDate)
        {
            var subscription = await _context.Subscriptions.FirstOrDefaultAsync(s => s.SubscriptionId == id);
            if (subscription != null)
            {
                subscription.SubscriptionPlanId = subscriptionPlanId;
                subscription.StartDate = startDate;
                subscription.EndDate = endDate;

                _context.Subscriptions.Update(subscription);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteSubscriptionAsync(int id)
        {
            var subscription = await _context.Subscriptions.FirstOrDefaultAsync(s => s.SubscriptionId == id);
            if (subscription != null)
            {
                _context.Subscriptions.Remove(subscription);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new Exception($"User with email {email} not found.");
            }
            return user;
        }





        public async Task<SubscriptionPlan> CreateSubscriptionPlanAsync(SubscriptionPlan subscriptionPlan)
        {
            _context.SubscriptionPlans.Add(subscriptionPlan);
            await _context.SaveChangesAsync();
            return subscriptionPlan;
        }

        public async Task<SubscriptionPlan?> GetSubscriptionPlanByIdAsync(int id)
        {
            return await _context.SubscriptionPlans.FirstOrDefaultAsync(sp => sp.SubscriptionPlanId == id);
        }

        public async Task<List<SubscriptionPlan>> GetAllSubscriptionPlansAsync()
        {
            return await _context.SubscriptionPlans.ToListAsync();
        }

        public async Task UpdateSubscriptionPlanAsync(int id, SubscriptionPlan updatedPlan)
        {
            var subscriptionPlan = await GetSubscriptionPlanByIdAsync(id);
            if (subscriptionPlan != null)
            {
                subscriptionPlan.Name = updatedPlan.Name;
                subscriptionPlan.Description = updatedPlan.Description;
                subscriptionPlan.DescriptionText = updatedPlan.DescriptionText;
                subscriptionPlan.Color = updatedPlan.Color;
                subscriptionPlan.Image = updatedPlan.Image;

                _context.SubscriptionPlans.Update(subscriptionPlan);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteSubscriptionPlanAsync(int id)
        {
            var subscriptionPlan = await GetSubscriptionPlanByIdAsync(id);
            if (subscriptionPlan != null)
            {
                _context.SubscriptionPlans.Remove(subscriptionPlan);
                await _context.SaveChangesAsync();
            }
        }


    }

}