using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Search_Service.Models
{
    public class Album
    {
        public required string Id { get; set; }  // MongoDB ObjectId for _id
        public required string Title { get; set; }
        public required string Image { get; set; }
        public required string ArtistId { get; set; }  // Reference to the Artist
    }
}