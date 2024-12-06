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
    [Route("api/albums")]
    public class AlbumController : ControllerBase
    {
        private readonly IMongoCollection<Album> _albums;
        private readonly IMongoCollection<Artist> _artists;

        public AlbumController(CatalogDbContext context)
        {
            _albums = context.Albums; // Access the MongoDB collection
            _artists = context.Artists; // Access the MongoDB collection
        }

        [HttpGet]
        public IActionResult GetAllAlbums()
        {
            var albums = _albums.Find(_ => true).ToList();

            var result = albums.Select(a => new
            {
                id = a.Id.ToString(),
                title = a.Title,
                image = a.Image,
                songs = a.Songs,
                year = a.Year,
                artistId = a.ArtistId
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetAlbum(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            // Fetch the album
            var album = _albums.Find(a => a.Id == objectId).FirstOrDefault();
            if (album == null)
            {
                return NotFound("Album not found.");
            }

            // Fetch the artist using the artistId from the album
            if (!ObjectId.TryParse(album.ArtistId, out var artistObjectId))
            {
                return BadRequest("Invalid Artist ID format in album.");
            }

            var artist = _artists.Find(a => a.Id == artistObjectId).FirstOrDefault();
            if (artist == null)
            {
                return NotFound("Artist not found.");
            }

            return Ok(new
            {
                id = album.Id.ToString(),
                title = album.Title,
                image = album.Image,
                songs = album.Songs,
                year = album.Year,
                artist = new
                {
                    id = artist.Id.ToString(),
                    name = artist.Name,
                    description = artist.Description,
                    imageCard = artist.ImageCard,
                    imageBg = artist.ImageBg,
                    monlis = artist.MonthlyListeners
                }
            });
        }


        [HttpPost]
        public IActionResult AddAlbum([FromBody] Album album)
        {
            if (album == null || string.IsNullOrWhiteSpace(album.Title) || string.IsNullOrWhiteSpace(album.ArtistId))
            {
                return BadRequest("Album data is required and must include a valid title and artistId.");
            }

            if (!ObjectId.TryParse(album.ArtistId, out var artistId))
            {
                return BadRequest("Invalid Artist ID format.");
            }

            var artist = _artists.Find(a => a.Id == artistId).FirstOrDefault();
            if (artist == null)
            {
                return NotFound($"Artist with ID {album.ArtistId} not found.");
            }

            _albums.InsertOne(album);

            // Update the artist's album list
            var update = Builders<Artist>.Update.Push(a => a.Albums, album.Id.ToString());
            _artists.UpdateOne(a => a.Id == artistId, update);

            return CreatedAtAction(nameof(GetAlbum), new { id = album.Id.ToString() }, new
            {
                id = album.Id.ToString(),
                title = album.Title,
                image = album.Image,
                songs = album.Songs,
                year = album.Year,
                artistId = album.ArtistId
            });
        }
    }
}
