using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog_Service.Models
{
    public class Artist
    {
        [BsonId]  // MongoDB's default identifier
        public ObjectId Id { get; set; }  // MongoDB ObjectId for _id
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string ImageBg { get; set; }
        public required string ImageCard { get; set; }
        public required int MonthlyListeners { get; set; }
    }
}