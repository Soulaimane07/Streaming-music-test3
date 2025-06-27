using MongoDB.Driver;
using Playlist_Service.Models;

namespace Playlist_Service.Data
{
    public class PlaylistDbContext
    {
        private readonly IMongoDatabase _database;

        public PlaylistDbContext(string connectionString)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(new MongoUrl(connectionString).DatabaseName);  // Get database name from connection string
        }

        public IMongoCollection<Playlist> Playlists => _database.GetCollection<Playlist>("Playlists");
    }
}
