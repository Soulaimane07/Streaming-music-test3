using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Catalog_Service.Data;
using Catalog_Service.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Catalog_Service.Controllers
{
    [ApiController]
    [Route("api/playlists")]
    public class PlaylistController : ControllerBase
    {
        private readonly IMongoCollection<Playlist> _playlists;

        public PlaylistController(CatalogDbContext context)
        {
            _playlists = context.Playlists; // Access the MongoDB collection for playlists
        }

        // Get all playlists
        [HttpGet]
        public IActionResult GetAllPlaylists()
        {
            var playlists = _playlists.Find(_ => true).ToList();

            var result = playlists.Select(p => new
            {
                id = p.Id.ToString(),
                title = p.Title,
                image = p.Image,
                songs = p.Songs
            }).ToList();

            return Ok(result);
        }

        // Get a specific playlist by ID
        [HttpGet("{id}")]
        public IActionResult GetPlaylist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var playlist = _playlists.Find(p => p.Id == objectId).FirstOrDefault();
            if (playlist == null)
            {
                return NotFound("Playlist not found.");
            }

            return Ok(new
            {
                id = playlist.Id.ToString(),
                title = playlist.Title,
                image = playlist.Image,
                songs = playlist.Songs
            });
        }

        // Create a new playlist
        [HttpPost]
        public IActionResult CreatePlaylist([FromBody] Playlist playlist)
        {
            if (playlist == null || string.IsNullOrWhiteSpace(playlist.Title))
            {
                return BadRequest("Playlist data is required and must include a valid title.");
            }

            _playlists.InsertOne(playlist);
            return CreatedAtAction(nameof(GetPlaylist), new { id = playlist.Id.ToString() }, new
            {
                id = playlist.Id.ToString(),
                title = playlist.Title,
                image = playlist.Image,
                songs = playlist.Songs
            });
        }

        // Update an existing playlist by ID
        [HttpPut("{id}")]
        public IActionResult UpdatePlaylist(string id, [FromBody] Playlist updatedPlaylist)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            if (updatedPlaylist == null || string.IsNullOrWhiteSpace(updatedPlaylist.Title))
            {
                return BadRequest("Updated playlist data is required.");
            }

            var update = Builders<Playlist>.Update
                .Set(p => p.Title, updatedPlaylist.Title)
                .Set(p => p.Image, updatedPlaylist.Image)
                .Set(p => p.Songs, updatedPlaylist.Songs);

            var result = _playlists.UpdateOne(p => p.Id == objectId, update);

            if (result.MatchedCount == 0)
            {
                return NotFound($"Playlist with ID {id} not found.");
            }

            var playlist = _playlists.Find(p => p.Id == objectId).FirstOrDefault();

            return Ok(new
            {
                id = playlist.Id.ToString(),
                title = playlist.Title,
                image = playlist.Image,
                songs = playlist.Songs
            });
        }

        // Delete a playlist by ID
        [HttpDelete("{id}")]
        public IActionResult DeletePlaylist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var result = _playlists.DeleteOne(p => p.Id == objectId);

            if (result.DeletedCount == 0)
            {
                return NotFound($"Playlist with ID {id} not found.");
            }

            return Ok();
        }
    }
}
