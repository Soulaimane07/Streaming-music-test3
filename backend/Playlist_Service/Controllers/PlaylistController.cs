using Microsoft.AspNetCore.Mvc;
using Playlist_Service.Models;
using Playlist_Service.Data;
using Grpc.Net.Client;
using Playlist_Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Playlist_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase, IDisposable
    {
        private readonly IMongoCollection<Playlist> _songs;
        private readonly GrpcChannel _channel;
        private readonly Songer.SongerClient _songerClient;

        public PlaylistController(PlaylistDbContext context)
        {
            _songs = context.Playlists;

            // Create a gRPC channel to Catalog Service
            _channel = GrpcChannel.ForAddress("http://localhost:5004"); // Catalog service URL
            _songerClient = new Songer.SongerClient(_channel);
        }

        public void Dispose()
        {
            _channel?.Dispose();
        }


        [HttpGet]
        public async Task<IActionResult> GetAllPlaylists()
        {
            var playlists = await _songs.Find(_ => true).ToListAsync();
            if (playlists == null || playlists.Count == 0)
            {
                return NotFound();
            }

            return Ok(playlists);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlaylist([FromBody] CreatePlaylistRequest request)
        {
            var songs = new List<Song>();
            foreach (var songId in request.SongIds)
            {
                var song = await GetSongFromCatalogService(songId);
                if (song != null)
                {
                    songs.Add(song);
                }
            }

            var playlist = new Playlist
            {
                Title = request.Title,
                Image = request.Image,
                Songs = songs
            };

            await _songs.InsertOneAsync(playlist);

            return CreatedAtAction(nameof(GetPlaylist), new { id = playlist.Id.ToString() }, playlist);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylist(string id)
        {
            var playlist = await _songs.Find(p => p.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (playlist == null)
            {
                return NotFound();
            }

            return Ok(playlist);
        }

        private async Task<Song> GetSongFromCatalogService(string songId)
        {
            var request = new SongRequest { Id = songId };

            // gRPC call to Catalog Service
            var response = await _songerClient.GetSongAsync(request);

            if (response != null)
            {
                return new Song
                {
                    Id = response.Id,
                    Name = response.Name,
                    Description = response.Description,
                    Duration = response.Duration,
                    AudioUrl = response.AudioUrl,
                    ImageUrl = response.ImageUrl
                };
            }

            return null;
        }
    }

    public class CreatePlaylistRequest
    {
        public string Title { get; set; }
        public string Image { get; set; }
        public List<string> SongIds { get; set; }
    }
}
