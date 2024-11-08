using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Npgsql;
using User.Service.Entities;

namespace User.Service.Repositories
{
    public class UsersRepository
    {
        private const string TableName = "users";
        private readonly string _connectionString;

        public UsersRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<AppUser>> GetAllUsersAsync()
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var users = await connection.QueryAsync<AppUser>("SELECT * FROM users");
            return users;
        }

        public async Task<AppUser> GetUserByIdAsync(Guid id)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var user = await connection.QueryFirstOrDefaultAsync<AppUser>("SELECT * FROM users WHERE id = @Id", new { Id = id });
            return user;
        }

        public async Task AddUserAsync(AppUser user)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "INSERT INTO users (id, fullname, email, password) VALUES (@Id, @FullName, @Email, @Password)";
            await connection.ExecuteAsync(query, user);
        }

        public async Task UpdateUserAsync(Guid id, AppUser user)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "UPDATE users SET fullname = @FullName, email = @Email, password = @Password WHERE id = @Id";
            await connection.ExecuteAsync(query, new { user.FullName, user.Email, user.Password, Id = id });
        }

        public async Task DeleteUserAsync(Guid id)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "DELETE FROM users WHERE id = @Id";
            await connection.ExecuteAsync(query, new { Id = id });
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "SELECT * FROM users WHERE email = @Email";
            var user = await connection.QueryFirstOrDefaultAsync<AppUser>(query, new { Email = email });
            return user;
        }

    }

}
