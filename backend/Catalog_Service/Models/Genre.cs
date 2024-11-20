using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Catalog_Service.Models
{
    public class Genre
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
    }
}