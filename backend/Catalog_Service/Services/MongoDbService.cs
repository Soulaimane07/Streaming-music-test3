using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Catalog_Service.Models;

namespace Catalog_Service.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("CatalogDb");
        }

        public IMongoCollection<Artist> Artists => _database.GetCollection<Artist>("artists");
        public IMongoCollection<Album> Albums => _database.GetCollection<Album>("albums");
        public IMongoCollection<Song> Songs => _database.GetCollection<Song>("songs");
        public IMongoCollection<Genre> Genres => _database.GetCollection<Genre>("genres");
    }
}