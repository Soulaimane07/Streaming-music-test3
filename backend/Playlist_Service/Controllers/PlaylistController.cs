using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Playlist_Service.Models;
using Playlist_Service.Data;
using Playlist_Service.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playlist_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly IMongoCollection<Playlist> _playlistsCollection;
        private readonly GrpcCatalogClient _grpcCatalogClient;

        public PlaylistController(PlaylistDbContext context, GrpcCatalogClient grpcCatalogClient)
        {
            _playlistsCollection = context.Playlists;
            _grpcCatalogClient = grpcCatalogClient;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlaylist([FromBody] CreatePlaylistRequest request)
        {
            if (request.SongIds == null || !request.SongIds.Any())
                return BadRequest("A playlist must contain at least one song.");

            // Fetch song details from CatalogService
            var songDetails = await GetSongsFromCatalog(request.SongIds);
            if (songDetails == null || !songDetails.Any())
                return NotFound("Some or all songs were not found in the catalog.");

            var playlist = new Playlist
            {
                Id = ObjectId.GenerateNewId(),
                Title = request.Title,
                Image = request.Image,
                Songs = songDetails
            };

            await _playlistsCollection.InsertOneAsync(playlist);

            return CreatedAtAction(nameof(GetPlaylist), new { id = playlist.Id.ToString() }, playlist);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaylist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
                return BadRequest("Invalid playlist ID.");

            var playlist = await _playlistsCollection.Find(p => p.Id == objectId).FirstOrDefaultAsync();
            if (playlist == null)
                return NotFound("Playlist not found.");

            return Ok(playlist);
        }

        private async Task<List<Song>> GetSongsFromCatalog(IEnumerable<string> songIds)
        {
            try
            {
                var songDetails = new List<Song>();
                foreach (var songId in songIds)
                {
                    var songResponse = await _grpcCatalogClient.GetSongDetailsAsync(songId);
                    if (songResponse != null)
                    {
                        songDetails.Add(new Song
                        {
                            Id = songResponse.SongId,
                            Name = songResponse.Name
                        });
                    }
                }

                return songDetails;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching songs from catalog: {ex.Message}");
                return null;
            }
        }
    }

    public class CreatePlaylistRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string> SongIds { get; set; } = new();
    }

    public class Song
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string AudioUrl { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
