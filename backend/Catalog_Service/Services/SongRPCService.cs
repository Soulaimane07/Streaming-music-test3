using Catalog_Service.Data;
using Catalog_Service.Models;
using Grpc.Core;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog_Service.Services
{
    public class SongRPCService : Songer.SongerBase
    {
        private readonly ILogger<SongRPCService> _logger;
        private readonly IMongoCollection<Song> _songs;

        public SongRPCService(ILogger<SongRPCService> logger, CatalogDbContext dbContext)
        {
            _logger = logger;
            _songs = dbContext.Songs; // Access the Songs collection
        }

        public override Task<SongResponse> GetSong(SongRequest request, ServerCallContext context)
        {
            var song = _songs.Find(s => s.Id == ObjectId.Parse(request.Id)).FirstOrDefault();
            return Task.FromResult(new SongResponse
            {
                Id = song?.Id.ToString(),
                Name = song?.Name,
                Description = song?.Description,
                Duration = song?.Duration.ToString(),
                AudioUrl = song?.AudioUrl,
                ImageUrl = song?.ImageUrl
            });
        }
    }
}
