using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Playlist_Service.Controllers;

namespace Playlist_Service.Models
{
    public class Playlist
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("image")]
        public string Image { get; set; } = string.Empty;

        [BsonElement("songs")]
        public List<Song> Songs { get; set; } = new();
    }
}
