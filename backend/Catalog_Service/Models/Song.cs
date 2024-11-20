using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Catalog_Service.Models
{
    public class Song
    {
        public ObjectId Id { get; set; }
        public ObjectId AlbumId { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public string AudioUrl { get; set; }
    }
}