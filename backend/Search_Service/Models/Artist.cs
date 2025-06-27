using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Search_Service.Models
{
    public class Artist
    {
        public required string Id { get; set; }  // MongoDB ObjectId for _id
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string ImageBg { get; set; }
        public required string ImageCard { get; set; }
    }
}