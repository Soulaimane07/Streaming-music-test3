using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog_Service.Models
{
    public class Genre
    {
        [BsonId]  // MongoDB's default identifier
        public ObjectId Id { get; set; }  // MongoDB ObjectId for _id
        public required string Name { get; set; }
        public required string Image { get; set; }
    }
}
