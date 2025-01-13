using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;
using Search_Service.Models;
using System;
using System.Text;
using Nest;

namespace Search_Service.Services
{
    public class MessageBroker
    {
        private readonly string _hostname = "localhost"; // RabbitMQ hostname or URL
        private readonly string _username = "guest";
        private readonly string _password = "guest";
        private readonly IElasticClient _elasticsearchClient;
        private IConnection _connection;
        private IModel _channel;

        public MessageBroker(IElasticClient elasticsearchClient)
        {
            _elasticsearchClient = elasticsearchClient;
            var factory = new ConnectionFactory() { HostName = _hostname, UserName = _username, Password = _password };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void ConsumeMessages(string exchange, string routingKey, string queueName)
        {
            try
            {
                // Declare the exchange
                _channel.ExchangeDeclare(exchange: exchange, type: "direct", durable: true, autoDelete: false);

                // Declare the queue (shared queue)
                _channel.QueueDeclare(queue: queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);

                // Bind the queue to the exchange for the provided routing key
                _channel.QueueBind(queue: queueName, exchange: exchange, routingKey: routingKey);

                // Create a consumer
                var consumer = new EventingBasicConsumer(_channel);

                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine($"[x] Received message with routing key '{ea.RoutingKey}': {message}");

                    // Process the message based on the routing key
                    ProcessMessage(ea.RoutingKey, message);
                };

                // Start consuming messages from the queue
                _channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);

                Console.WriteLine($"Started consuming messages from queue: {queueName} (Routing key: {routingKey})");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error consuming messages: " + ex.Message);
            }
        }

        private void ProcessMessage(string routingKey, string message)
        {
            try
            {
                switch (routingKey)
                {
                    case "song.added":
                        var song = JsonConvert.DeserializeObject<Song>(message);
                        IndexDocument(song, "songs");
                        break;
                    case "artist.added":
                        var artist = JsonConvert.DeserializeObject<Artist>(message);
                        IndexDocument(artist, "artists");
                        break;
                    case "album.added":
                        var album = JsonConvert.DeserializeObject<Album>(message);
                        IndexDocument(album, "albums");
                        break;
                    default:
                        Console.WriteLine($"Unknown routing key: {routingKey}");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing message: {ex.Message}");
            }
        }

        private void IndexDocument<T>(T document, string indexName) where T : class
        {
            var response = _elasticsearchClient.Index(document, i => i.Index(indexName));
            if (response.IsValid)
            {
                Console.WriteLine($"Document indexed successfully in {indexName}: {JsonConvert.SerializeObject(document)}");
            }
            else
            {
                Console.WriteLine($"Error indexing document in {indexName}: {response.ServerError?.Error?.Reason}");
            }
        }
    }
}
