using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using System;

namespace Catalog_Service.Models
{
    public class Album
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public ObjectId ArtistId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ImageUrl { get; set; }
    }
}