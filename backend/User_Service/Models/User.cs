using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace User_Service.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Name { get; set; }
        public required string ProfilePictureUrl { get; set; }
    }

}