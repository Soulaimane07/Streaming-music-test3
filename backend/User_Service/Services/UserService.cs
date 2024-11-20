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


        public async Task<Subscription> CreateSubscriptionAsync(Subscription subscription)
        {
            // Fetch the user by the provided userId
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == subscription.UserId);
            if (user == null)
            {
                throw new Exception($"User with ID {subscription.UserId} not found.");
            }

            // Associate the user with the subscription
            subscription.UserId = user.UserId; // Ensure that subscription is linked to a valid user

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }


        // Get a subscription by ID
        public async Task<Subscription> GetSubscriptionByIdAsync(int id)
        {
            return await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.SubscriptionId == id);
        }

        // Get subscriptions for a specific user
        public async Task<List<Subscription>> GetUserSubscriptionsAsync(int userId)
        {
            return await _context.Subscriptions
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }

        // Update a subscription
        public async Task UpdateSubscriptionAsync(int id, Subscription updatedSubscription)
        {
            var subscription = await GetSubscriptionByIdAsync(id);
            if (subscription != null)
            {
                subscription.PlanName = updatedSubscription.PlanName;
                subscription.StartDate = updatedSubscription.StartDate;
                subscription.EndDate = updatedSubscription.EndDate;
                subscription.IsActive = updatedSubscription.IsActive;

                _context.Subscriptions.Update(subscription);
                await _context.SaveChangesAsync();
            }
        }

        // Delete a subscription
        public async Task DeleteSubscriptionAsync(int id)
        {
            var subscription = await GetSubscriptionByIdAsync(id);
            if (subscription != null)
            {
                _context.Subscriptions.Remove(subscription);
                await _context.SaveChangesAsync();
            }
        }



        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }




    }

}