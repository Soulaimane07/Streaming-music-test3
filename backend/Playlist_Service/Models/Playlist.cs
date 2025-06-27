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
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public required string Title { get; set; } = string.Empty;

        [BsonElement("image")]
        public required string Image { get; set; } = string.Empty;

        public List<Song> Songs { get; set; } = new();
        public User User { get; set; } = new();
    }

    
}

public class Song
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

public class User 
{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
}