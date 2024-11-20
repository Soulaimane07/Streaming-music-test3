using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Catalog_Service.Services;
using Catalog_Service.Models;
using System.Threading.Tasks;
using MongoDB.Driver;


namespace Catalog_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly ElasticsearchService _elasticsearchService;

        public CatalogController(MongoDbService mongoDbService, ElasticsearchService elasticsearchService)
        {
            _mongoDbService = mongoDbService;
            _elasticsearchService = elasticsearchService;
        }

        // POST: api/catalog/artists
        [HttpPost("artists")]
        public async Task<ActionResult> CreateArtist([FromBody] Artist artist)
        {
            await _mongoDbService.Artists.InsertOneAsync(artist);
            await _elasticsearchService.IndexDocumentAsync(artist);  // Index artist in Elasticsearch
            return Ok();
        }


        // GET: api/catalog/artists/{id}
        [HttpGet("artists/{id}")]
        public ActionResult<Artist> GetArtist(string id)
        {
            var artist = _mongoDbService.Artists.Find(a => a.Id == new ObjectId(id)).FirstOrDefault();
            if (artist == null)
                return NotFound();

            return Ok(artist);
        }



        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            var response = _elasticsearchService.Search<Artist>(q);
            return Ok(response.Documents);
        }

        [HttpPost("index-artist")]
        public IActionResult IndexArtist([FromBody] Artist artist)
        {
            _elasticsearchService.IndexDocument(artist, artist.Id);
            return Ok();
        }

    }
}