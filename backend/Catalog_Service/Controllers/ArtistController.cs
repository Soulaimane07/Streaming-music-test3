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
    [Route("api/artists")]
    public class ArtistController : ControllerBase
    {
        private readonly IMongoCollection<Artist> _artists;
        private readonly IMongoCollection<Album> _albums;
        private readonly IMongoCollection<Song> _songs;

        public ArtistController(CatalogDbContext context)
        {
            _artists = context.Artists; // Access the MongoDB collection
            _albums = context.Albums;
            _songs = context.Songs;
        }

        [HttpGet]
        public IActionResult GetAllArtists()
        {
            var artists = _artists.Find(_ => true).ToList();

            var result = artists.Select(a => new
            {
                id = a.Id.ToString(),
                name = a.Name,
                description = a.Description,
                imageBg = a.ImageBg,
                imageCard = a.ImageCard,
                monlis = a.MonthlyListeners,
            }).ToList();

            return Ok(result);
        }


        [HttpGet("{id}")]
        public IActionResult GetOneArtist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            // Fetch the artist
            var artist = _artists.Find(a => a.Id == objectId).FirstOrDefault();
            if (artist == null)
            {
                return NotFound();
            }

            // Fetch all album details for this artist
            var albumIds = artist.Albums ?? new List<string>();
            var objectIdAlbums = albumIds
                .Where(albumId => ObjectId.TryParse(albumId, out _))
                .Select(albumId => ObjectId.Parse(albumId))
                .ToList();

            var albums = _albums.Find(album => objectIdAlbums.Contains(album.Id)).ToList();

            // Fetch the artist's specific songs (those not tied to albums)
            var artistSongs = _songs.Find(song => song.ArtistId == artist.Id.ToString()).ToList();

            // Fetch associated songs for each album
            var albumsWithSongs = albums.Select(album => new
            {
                id = album.Id.ToString(),
                title = album.Title,
                image = album.Image,
                year = album.Year,
                songs = album.SongIds
                    .Select(songId => _songs.Find(s => s.Id == ObjectId.Parse(songId)).FirstOrDefault())
                    .Where(song => song != null) // Ensure nulls are removed
                    .Select(song => new
                    {
                        id = song.Id.ToString(),
                        name = song.Name,
                        description = song.Description,
                        duration = song.Duration,
                        audioUrl = song.AudioUrl,
                        imageUrl = song.ImageUrl
                    })
                    .ToList()
            }).ToList();

            // Prepare the final response with both artist and album songs
            return Ok(new
            {
                id = artist.Id.ToString(),
                name = artist.Name,
                description = artist.Description,
                imageCard = artist.ImageCard,
                imageBg = artist.ImageBg,
                monlis = artist.MonthlyListeners,
                albums = albumsWithSongs,
                artistSongs = artistSongs.Select(song => new
                {
                    id = song.Id.ToString(),
                    name = song.Name,
                    description = song.Description,
                    duration = song.Duration,
                    audioUrl = song.AudioUrl,
                    imageUrl = song.ImageUrl
                }).ToList()
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

            MessageBroker broker = new MessageBroker();
            broker.PublishMessage("catalog_exchange", "artist.added", artist);

            return CreatedAtAction(nameof(GetOneArtist), new { id = artist.Id.ToString() }, new
            {
                id = artist.Id.ToString(),
                name = artist.Name,
                description = artist.Description,
                imageBg = artist.ImageBg,
                imageCard = artist.ImageCard,
                monlis = artist.MonthlyListeners,
                albums = artist.Albums
            });
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
                .Set(a => a.Name, updatedArtist.Name)
                .Set(a => a.Description, updatedArtist.Description)
                .Set(a => a.ImageCard, updatedArtist.ImageCard)
                .Set(a => a.ImageBg, updatedArtist.ImageBg)
                .Set(a => a.Albums, updatedArtist.Albums);

            var result = _artists.UpdateOne(a => a.Id == objectId, update);

            if (result.MatchedCount == 0)
            {
                return NotFound($"Artist with ID {id} not found.");
            }

            var artist = _artists.Find(a => a.Id == objectId).FirstOrDefault();

            return Ok(new
            {
                id = artist.Id.ToString(),
                name = artist.Name,
                description = artist.Description,
                imageBg = artist.ImageBg,
                imageCard = artist.ImageCard,
                monlis = artist.MonthlyListeners,
                albums = artist.Albums
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteArtist(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var result = _artists.DeleteOne(a => a.Id == objectId);

            if (result.DeletedCount == 0)
            {
                return NotFound($"Artist with ID {id} not found.");
            }

            return Ok();
        }
    }
}
