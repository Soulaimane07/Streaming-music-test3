using Microsoft.AspNetCore.Mvc;
using Playlist_Service.Models;
using Playlist_Service.Data;
using Grpc.Net.Client;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Playlist_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase, IDisposable
    {
        private readonly IMongoCollection<Playlist> _playlists;
        private readonly GrpcChannel _channelSong;
        private readonly GrpcChannel _channelUser;
        private readonly Songer.SongerClient _songerClient;
        private readonly Userer.UsererClient _userClient;

        public PlaylistController(PlaylistDbContext context)
        {
            _playlists = context.Playlists;

            // Create a gRPC channel to Catalog Service
            _channelSong = GrpcChannel.ForAddress("http://localhost:5004"); // Catalog service URL
            _channelUser = GrpcChannel.ForAddress("http://localhost:5001"); // Catalog service URL
            _songerClient = new Songer.SongerClient(_channelSong);
            _userClient = new Userer.UsererClient(_channelUser);
        }

        public void Dispose()
        {
            _channelSong?.Dispose();
            _channelUser?.Dispose();
        }


        [HttpGet]
        public async Task<IActionResult> GetAllPlaylists()
        {
            var playlists = await _playlists.Find(_ => true).ToListAsync();
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

            if (request.SongIds.Count > 0)
            {
                foreach (var songId in request.SongIds)
                {
                    var song = await GetSongFromCatalogService(songId);
                    if (song != null)
                    {
                        songs.Add(song);
                    }
                }
            }
            
            var user = await GetUserFromUserService(request.UserId);

            var playlist = new Playlist
            {
                Title = request.Title,
                Image = request.Image,
                Songs = songs,
                User = user
            };

            await _playlists.InsertOneAsync(playlist);

            return CreatedAtAction(nameof(GetPlaylist), new { id = playlist.Id.ToString() }, playlist);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylist(string id)
        {
            var playlist = await _playlists.Find(p => p.Id == new ObjectId(id)).FirstOrDefaultAsync();
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

            return new();
        }

        private async Task<User> GetUserFromUserService(int userId)
        {
            var request = new userRequest { Id = userId };

            // gRPC call to Catalog Service
            var response = await _userClient.GetUserAsync(request);

            if (response != null)
            {
                return new User
                {
                    Id = response.Id,
                    Name = response.Name,
                    Email = response.Email,
                    ProfilePictureUrl = response.ProfilePictureUrl
                };
            }

            return new();
        }
    }

    public class CreatePlaylistRequest
    {
        public required string Title { get; set; }
        public required string Image { get; set; }
        public required List<string> SongIds { get; set; }
        public int UserId { get; set; }
    }
}
