using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Catalog_Service.Data;
using Catalog_Service.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using Catalog_Service.Services;

namespace Catalog_Service.Controllers
{
    [ApiController]
    [Route("api/songs")]
    public class SongController : ControllerBase
    {
        private readonly IMongoCollection<Song> _songs;
        private readonly IMongoCollection<Artist> _artists;
        private readonly IMongoCollection<Album> _albums;


        public SongController(CatalogDbContext context)
        {
            _songs = context.Songs; // Access the MongoDB collection
            _artists = context.Artists; // Access the MongoDB collection
            _albums = context.Albums;
        }

        [HttpGet]
        public IActionResult GetAllSongs()
        {
            var songs = _songs.Find(_ => true).ToList();

            var result = songs.Select(g => new { id = g.Id.ToString(), name = g.Name, description = g.Description, duration = g.Duration, audioUrl = g.AudioUrl, image = g.ImageUrl }).ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult GetOneSong(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var song = _songs.Find(g => g.Id == objectId).FirstOrDefault();

            if (song == null)
            {
                return NotFound();
            }

            return Ok(new { id = song.Id.ToString(), name = song.Name, description = song.Description, duration = song.Duration, audioUrl = song.AudioUrl, image = song.ImageUrl});
        }


        [HttpPost]
        public IActionResult AddSong([FromBody] Song song)
        {
            if (song == null || string.IsNullOrWhiteSpace(song.Name) || string.IsNullOrWhiteSpace(song.ArtistId))
            {
                return BadRequest("Song data is required and must include a valid name and ArtistId.");
            }

            // Validate if the artist exists
            var artistExists = _artists.Find(a => a.Id == ObjectId.Parse(song.ArtistId)).Any();
            if (!artistExists)
            {
                return BadRequest("Invalid ArtistId. Artist does not exist.");
            }

            _songs.InsertOne(song);

            // Publish the message
            MessageBroker broker = new MessageBroker();
            broker.PublishMessage("catalog_exchange", "song.added", song);

            return CreatedAtAction(nameof(GetOneSong), new { id = song.Id.ToString() }, song);
        }

        
        [HttpGet("artist/{artistId}")]
        public IActionResult GetSongsByArtist(string artistId)
        {
            if (!ObjectId.TryParse(artistId, out var objectId))
            {
                return BadRequest("Invalid ArtistId format.");
            }

            var songs = _songs.Find(song => song.ArtistId == artistId).ToList();

            if (songs == null || !songs.Any())
            {
                return NotFound("No songs found for this artist.");
            }

            var result = songs.Select(s => new { id = s.Id.ToString(), name = s.Name, description = s.Description, duration = s.Duration, audioUrl = s.AudioUrl, image = s.ImageUrl }).ToList();

            return Ok(result);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateSong(string id, [FromBody] Song updatedSong)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            if (updatedSong == null || string.IsNullOrWhiteSpace(updatedSong.Name))
            {
                return BadRequest("Updated song data is required.");
            }

            var update = Builders<Song>.Update
                .Set(g => g.Name, updatedSong.Name)
                .Set(g => g.Description, updatedSong.Description)
                .Set(g => g.ImageUrl, updatedSong.ImageUrl);

            var result = _songs.UpdateOne(g => g.Id == objectId, update);

            if (result.MatchedCount == 0)
            {
                return NotFound($"Song with ID {id} not found.");
            }

            var song = _songs.Find(g => g.Id == objectId).FirstOrDefault();

            return Ok(new { id = song.Id.ToString(), name = song.Name, description = song.Description, duration = song.Duration, audioUrl = song.AudioUrl, image = song.ImageUrl  });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteSong(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var result = _songs.DeleteOne(g => g.Id == objectId);

            if (result.DeletedCount == 0)
            {
                return NotFound($"Song with ID {id} not found.");
            }

            return Ok();
        }




[HttpPost("add-song")]
public IActionResult AddSongToAlbum([FromBody] Song song)
{
    if (song == null || string.IsNullOrWhiteSpace(song.Name) || string.IsNullOrWhiteSpace(song.AlbumId))
    {
        return BadRequest("Song data is required and must include a valid name and AlbumId.");
    }

    // Validate AlbumId
    if (!ObjectId.TryParse(song.AlbumId, out var albumObjectId))
    {
        return BadRequest("Invalid Album ID format.");
    }

    // Fetch the album
    var album = _albums.Find(a => a.Id == albumObjectId).FirstOrDefault();
    if (album == null)
    {
        return NotFound($"Album with ID {song.AlbumId} not found.");
    }

    // Insert the song into the Songs collection
    _songs.InsertOne(song);

    // Update the Album's SongIds list
    var update = Builders<Album>.Update.Push(a => a.SongIds, song.Id.ToString());
    _albums.UpdateOne(a => a.Id == albumObjectId, update);

    // Return the created song details
    return CreatedAtAction(nameof(GetOneSong), new { id = song.Id.ToString() }, new
    {
        id = song.Id.ToString(),
        name = song.Name,
        description = song.Description,
        duration = song.Duration,
        audioUrl = song.AudioUrl,
        imageUrl = song.ImageUrl,
        albumId = song.AlbumId
    });
}


    }
}