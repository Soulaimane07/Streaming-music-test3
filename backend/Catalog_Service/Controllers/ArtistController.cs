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
    [Route("api/artists")]
    public class ArtistController : ControllerBase
    {
        private readonly IMongoCollection<Artist> _artists;
        private readonly IMongoCollection<Song> _songs;


        public ArtistController(CatalogDbContext context)
        {
            _artists = context.Artists; // Access the MongoDB collection
            _songs = context.Songs; // Access the MongoDB collection
        }

        [HttpGet]
        public IActionResult GetAllArtists()
        {
            var artists = _artists.Find(_ => true).ToList();

            var result = artists.Select(g => new { id = g.Id.ToString(), name = g.Name, description = g.Description, image = g.ImageUrl }).ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult GetOneArtistWithSongs(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var artist = _artists.Find(a => a.Id == objectId).FirstOrDefault();
            if (artist == null)
            {
                return NotFound();
            }

            // Fetch all songs by this artist
            var songs = _songs.Find(song => song.ArtistId == id).ToList();

            return Ok(new
            {
                id = artist.Id.ToString(),
                name = artist.Name,
                description = artist.Description,
                image = artist.ImageUrl,
                songs = songs.Select(s => new { id = s.Id.ToString(), name = s.Name, description = s.Description, duration = s.Duration, audioUrl = s.AudioUrl, image = s.ImageUrl }).ToList()
            });
        }



        [HttpPost]
        public IActionResult AddArtist([FromBody] Artist artist)
        {
            if (artist == null || string.IsNullOrWhiteSpace(artist.Name))
            {
                return BadRequest("Artist data is required and must include a valid name.");
            }

            _artists.InsertOne(artist);
            return CreatedAtAction(nameof(GetOneArtistWithSongs), new { id = artist.Id.ToString() }, new { id = artist.Id.ToString(), name = artist.Name, description = artist.Description, image = artist.ImageUrl });
        }
        

        [HttpPut("{id}")]
        public IActionResult UpdateArtist(string id, [FromBody] Artist updatedArtist)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            if (updatedArtist == null || string.IsNullOrWhiteSpace(updatedArtist.Name))
            {
                return BadRequest("Updated artist data is required.");
            }

            var update = Builders<Artist>.Update
                .Set(g => g.Name, updatedArtist.Name)
                .Set(g => g.Description, updatedArtist.Description)
                .Set(g => g.ImageUrl, updatedArtist.ImageUrl);

            var result = _artists.UpdateOne(g => g.Id == objectId, update);

            if (result.MatchedCount == 0)
            {
                return NotFound($"Artist with ID {id} not found.");
            }

            var artist = _artists.Find(g => g.Id == objectId).FirstOrDefault();

            return Ok(new { id = artist.Id.ToString(), name = artist.Name, description = artist.Description, image = artist.ImageUrl  });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteArtist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var result = _artists.DeleteOne(g => g.Id == objectId);

            if (result.DeletedCount == 0)
            {
                return NotFound($"Artist with ID {id} not found.");
            }

            return Ok();
        }
        
    }
}