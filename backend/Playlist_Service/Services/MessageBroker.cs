using Playlist_Service.Models;
using RabbitMQ.Client;
using System.Text;
using Newtonsoft.Json;

namespace Playlist_Service.Services
{
public class MessageBroker
{
    private readonly string _hostname = "localhost"; // Use container name here
    private readonly string _username = "guest";
    private readonly string _password = "guest";
    
    private IConnection _connection;
    private IModel _channel;

    public MessageBroker()
    {
        var factory = new ConnectionFactory() { HostName = _hostname, UserName = _username, Password = _password };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
    }

    public void PublishMessage(string exchange, string routingKey, object obj)
    {
        try
        {
            // Declare the exchange (ensure it's of type 'direct')
            _channel.ExchangeDeclare(exchange: exchange, type: "direct", durable: true, autoDelete: false);

            // Declare the queue if it doesn't exist
            _channel.QueueDeclare(queue: "catalog_queue", durable: true, exclusive: false, autoDelete: false, arguments: null);

            // Bind the queue to the exchange with the correct routing key
            _channel.QueueBind(queue: "catalog_queue", exchange: exchange, routingKey: routingKey);

            // Serialize the Song object to JSON
            var message = JsonConvert.SerializeObject(obj);
            var body = Encoding.UTF8.GetBytes(message);  // Convert JSON string to byte array

            // Publish the message to the exchange
            _channel.BasicPublish(
                exchange: exchange,
                routingKey: routingKey,
                basicProperties: null,
                body: body
            );

            Console.WriteLine("Message Published: " + message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error publishing message: " + ex.Message);
        }
    }
    }
}
