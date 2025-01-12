using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog_Service.Models
{
    public class Song
    {
        [BsonId]  // MongoDB's default identifier
        public ObjectId Id { get; set; }  // MongoDB ObjectId for _id

        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Duration { get; set; }
        public required string AudioUrl { get; set; }
        public required string ImageUrl { get; set; }

        [BsonRepresentation(BsonType.ObjectId)] // Store as ObjectId in MongoDB
        public required string ArtistId { get; set; }  // Reference to the Artist

        [BsonRepresentation(BsonType.ObjectId)]
        public string AlbumId { get; set; }  

        // List of genre references (ObjectIds) in the Song model
        // [BsonRepresentation(BsonType.ObjectId)] 
        // public List<ObjectId> GenreIds { get; set; }  // List of genre ObjectIds for the song
    }
}
