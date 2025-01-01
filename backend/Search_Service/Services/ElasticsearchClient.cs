using Elasticsearch.Net;
using Nest;
using Microsoft.Extensions.Configuration;
using Search_Service.Models;


namespace Search_Service.Services
{
    public class ElasticsearchClient
    {
        private readonly IElasticClient _client;

        public ElasticsearchClient(IConfiguration configuration)
        {
            var settings = new ConnectionSettings(new Uri(configuration["Elasticsearch:Url"]))
                .ServerCertificateValidationCallback((sender, cert, chain, errors) => true)
                .BasicAuthentication("elastic", "sYnvI+0+rbGii+Q_*xxM")
                .DefaultMappingFor<Song>(m => m.IndexName("songs"))
                .DefaultMappingFor<Artist>(m => m.IndexName("artists"))
                .DefaultMappingFor<Album>(m => m.IndexName("albums"))
                .DefaultMappingFor<Playlist>(m => m.IndexName("playlists"));

            _client = new ElasticClient(settings);
        }

        public IElasticClient GetClient() => _client;
    }
}
