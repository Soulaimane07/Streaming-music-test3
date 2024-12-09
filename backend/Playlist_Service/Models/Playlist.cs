using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Playlist_Service.Models
{
    public class Playlist
    {
        [BsonId]  // MongoDB's default identifier
        public ObjectId Id { get; set; }  // MongoDB ObjectId for _id

        [BsonRequired]
        public required string Title { get; set; }

        [BsonRequired]
        public required string Image { get; set; }

        [BsonRequired]
        public required int Songs { get; set; }

        // [BsonRequired]
        // public required int UserId { get; set; }
    }
}