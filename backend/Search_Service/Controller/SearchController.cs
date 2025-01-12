using Microsoft.AspNetCore.Mvc;
using Nest;
using Search_Service.Models;
using System.Threading.Tasks;
using System.Linq;

namespace Search_Service.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IElasticClient _client;

        public SearchController(IElasticClient client)
        {
            _client = client; // This will correctly use the DI container to inject IElasticClient
        }

        // Index data for songs
        [HttpPost("index/songs")]
        public async Task<IActionResult> IndexSong([FromBody] Song song)
        {
            var response = await _client.IndexDocumentAsync(song);
            if (response.IsValid)
                return Ok("Song document indexed successfully.");
            return BadRequest(response.OriginalException.Message);
        }

        // Index data for artists
        [HttpPost("index/artists")]
        public async Task<IActionResult> IndexArtist([FromBody] Artist artist)
        {
            var response = await _client.IndexDocumentAsync(artist);
            if (response.IsValid)
                return Ok("Artist document indexed successfully.");
            return BadRequest(response.OriginalException.Message);
        }

        // Index data for playlists
        [HttpPost("index/playlists")]
        public async Task<IActionResult> IndexPlaylist([FromBody] Playlist playlist)
        {
            var response = await _client.IndexDocumentAsync(playlist);
            if (response.IsValid)
                return Ok("Playlist document indexed successfully.");
            return BadRequest(response.OriginalException.Message);
        }

        // Index data for albums
        [HttpPost("index/albums")]
        public async Task<IActionResult> IndexAlbum([FromBody] Album album)
        {
            var response = await _client.IndexDocumentAsync(album);
            if (response.IsValid)
                return Ok("Document Album indexed successfully.");
            return BadRequest(response.OriginalException.Message);
        }


        // Search across multiple indices (songs, artists, albums, playlists)
        [HttpGet("search")]
public async Task<IActionResult> Search([FromQuery] string query)
{
    try
    {
        var response = await _client.SearchAsync<object>(s => s
            .Index(new[] { "songs", "artists", "albums", "playlists" }) // Specify indices to search
            .Query(q => q
                .MultiMatch(m => m
                    .Fields(f => f
                        .Field("name") // Common field across entities
                        .Field("description") // Common field for entities like albums or playlists
                        .Field("title") // Common field across entities
                    )
                    .Query(query) // Search query
                )
            )
        );

        if (response.IsValid)
        {
            // Check if there are hits and return an empty list if not
            if (!response.Hits.Any())
                return Ok(new List<SearchResult>()); // Return empty list if no results

            // Map results to a typed response
            var results = response.Hits.Select(hit =>
            {
                return hit.Index switch
                {
                    "songs" => new SearchResult { Type = "Song", Data = hit.Source },
                    "artists" => new SearchResult { Type = "Artist", Data = hit.Source },
                    "albums" => new SearchResult { Type = "Album", Data = hit.Source },
                    "playlists" => new SearchResult { Type = "Playlist", Data = hit.Source },
                    _ => null
                };
            }).Where(result => result != null); // Filter out any null results

            return Ok(results);
        }

        // Return a BadRequest response with the error message
        return BadRequest(response.OriginalException?.Message);
    }
    catch (Exception ex)
    {
        // Catch unexpected errors and return them
        return BadRequest($"An error occurred: {ex.Message}");
    }
}

public class SearchResult
{
    public string Type { get; set; }
    public object Data { get; set; }
}
    }
}
