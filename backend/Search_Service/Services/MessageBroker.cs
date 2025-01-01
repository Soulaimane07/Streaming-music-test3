using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;
using Search_Service.Models;
using Search_Service.Services;
using System;
using System.Text;
using System.Threading.Tasks;

using Nest;
using System.Linq;

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
            _channel.ExchangeDeclare(exchange: exchange, type: "direct", durable: true, autoDelete: false);
            _channel.QueueDeclare(queue: queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
            _channel.QueueBind(queue: queueName, exchange: exchange, routingKey: routingKey);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (sender, args) =>
            {
                var message = Encoding.UTF8.GetString(args.Body.ToArray());
                var song = JsonConvert.DeserializeObject<Song>(message);

                Console.WriteLine($"Message Consumed: {JsonConvert.SerializeObject(song, Formatting.Indented)}");

                var response = await _elasticsearchClient.IndexDocumentAsync(song);
                if (response.IsValid)
                    Console.WriteLine("Song document indexed successfully.");

                _channel.BasicAck(args.DeliveryTag, false);
            };

            _channel.BasicConsume(queue: queueName, autoAck: false, consumer: consumer);
        }
    }
}
