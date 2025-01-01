using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Search_Service.Models
{
    public class Song
    {
        public required string Id { get; set; }  // MongoDB ObjectId for _id
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Duration { get; set; }
        public required string AudioUrl { get; set; }
        public required string ImageUrl { get; set; }
        public required string ArtistId { get; set; }  // Reference to the Artist
        public required string AlbumId { get; set; }
    }
}