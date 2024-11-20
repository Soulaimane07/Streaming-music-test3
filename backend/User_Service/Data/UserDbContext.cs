using Microsoft.EntityFrameworkCore;
// using User_Service.Data;
using User_Service.Models;
// using User_Service.Services;

namespace User_Service.Data
{
    
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
    }

}
