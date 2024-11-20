using Nest;
using System;

namespace Catalog_Service.Services
{
    public class ElasticsearchService
    {
        private readonly ElasticClient _client;

        // Configure the client connection to Elasticsearch
        public ElasticsearchService(string elasticsearchUrl)
        {
            var settings = new ConnectionSettings(new Uri(elasticsearchUrl))
                .DefaultIndex("CatalogDb"); // Define a default index for your app

            _client = new ElasticClient(settings);
        }

        // Method to check if Elasticsearch is running
        public bool Ping()
        {
            var pingResponse = _client.Ping();
            return pingResponse.IsValid;
        }

        // Method to index music-related data (artist, album, song)
        public void IndexDocument<T>(T document, string id) where T : class
        {
            var indexResponse = _client.IndexDocument(document);
            if (!indexResponse.IsValid)
            {
                Console.WriteLine($"Error indexing document: {indexResponse.OriginalException.Message}");
            }
        }

        // Method to search for documents (artists, albums, songs)
        public ISearchResponse<T> Search<T>(string query) where T : class
        {
            var searchResponse = _client.Search<T>(s => s.Query(q => q.QueryString(d => d.Query(query))));
            return searchResponse;
        }
    }
}