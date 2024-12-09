using MongoDB.Driver;
using Catalog_Service.Models;

namespace Catalog_Service.Data
{
    public class CatalogDbContext
    {
        private readonly IMongoDatabase _database;

        // Constructor that accepts the connection string
        public CatalogDbContext(string connectionString)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(new MongoUrl(connectionString).DatabaseName);  // Get database name from connection string
        }

        public IMongoCollection<Genre> Genres => _database.GetCollection<Genre>("Genres");
        public IMongoCollection<Artist> Artists => _database.GetCollection<Artist>("Artists");
        public IMongoCollection<Song> Songs => _database.GetCollection<Song>("Songs");
        public IMongoCollection<Album> Albums => _database.GetCollection<Album>("Album");
        // public IMongoCollection<Playlist> Playlists => _database.GetCollection<Playlist>("Playlists");
    }
}
