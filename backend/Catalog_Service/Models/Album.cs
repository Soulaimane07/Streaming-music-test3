using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog_Service.Models
{
    public class Album
    {
        [BsonId]  // MongoDB's default identifier
        public ObjectId Id { get; set; }  // MongoDB ObjectId for _id
        public required string Title { get; set; }
        public required string Image { get; set; }
        public required int Songs { get; set; }
        public required int Year { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]  // Store as string in MongoDB
        public required string ArtistId { get; set; }  // Reference to the Artist
    }
}