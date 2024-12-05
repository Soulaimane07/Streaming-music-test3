using Microsoft.AspNetCore.Mvc;
using Catalog_Service.Data;
using Catalog_Service.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Catalog_Service.Controllers
{
    [ApiController]
    [Route("api/genres")]
    public class GenreController : ControllerBase
    {
        private readonly IMongoCollection<Genre> _genres;

        public GenreController(CatalogDbContext context)
        {
            _genres = context.Genres; // Access the MongoDB collection
        }

        [HttpGet]
        public IActionResult GetAllGenres()
        {
            // Retrieve all genres
            var genres = _genres.Find(_ => true).ToList();

            // Project the genres into a simplified format
            var result = genres.Select(g => new { id = g.Id.ToString(), name = g.Name, image = g.Image }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetOneGenre(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var genre = _genres.Find(g => g.Id == objectId).FirstOrDefault();

            if (genre == null)
            {
                return NotFound();
            }

            return Ok(new { id = genre.Id.ToString(), name = genre.Name, image = genre.Image });
        }

        [HttpPost]
        public IActionResult AddGenre([FromBody] Genre genre)
        {
            if (genre == null || string.IsNullOrWhiteSpace(genre.Name))
            {
                return BadRequest("Genre data is required and must include a valid name.");
            }

            _genres.InsertOne(genre);
            return CreatedAtAction(nameof(GetOneGenre), new { id = genre.Id.ToString() }, new { id = genre.Id.ToString(), name = genre.Name, image = genre.Image });
        }
        

        [HttpPut("{id}")]
        public IActionResult UpdateGenre(string id, [FromBody] Genre updatedGenre)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            if (updatedGenre == null || string.IsNullOrWhiteSpace(updatedGenre.Name))
            {
                return BadRequest("Updated genre data is required.");
            }

            var update = Builders<Genre>.Update
                .Set(g => g.Name, updatedGenre.Name);

            var result = _genres.UpdateOne(g => g.Id == objectId, update);

            if (result.MatchedCount == 0)
            {
                return NotFound($"Genre with ID {id} not found.");
            }

            // Retrieve the updated genre document from the database to include in the response
            var genre = _genres.Find(g => g.Id == objectId).FirstOrDefault();

            return Ok(new { id = genre.Id.ToString(), name = genre.Name, image = genre.Image });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteGenre(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }

            var result = _genres.DeleteOne(g => g.Id == objectId);

            if (result.DeletedCount == 0)
            {
                return NotFound($"Genre with ID {id} not found.");
            }

            return Ok();
        }
    }
}
