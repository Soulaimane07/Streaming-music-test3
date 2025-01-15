using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Search_Service.Models
{
    public class Playlist
    {
        public required string Id { get; set; }  // MongoDB ObjectId for _id
        public required string Title { get; set; }
        public required string Image { get; set; }
        public List<Song> Songs { get; set; } = [];
        public required User User { get; set; }
    }

    public class User
    {
        public int UserId { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
    }
}