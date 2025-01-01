using Grpc.Core;
using User_Service.Data;
using User_Service.Models;

namespace User_Service.Services
{
    public class UserRPCService : Userer.UsererBase
    {
        private readonly ILogger<UserRPCService> _logger;
        private readonly UserService _userService;


        public UserRPCService(ILogger<UserRPCService> logger, UserService userService
        )
        {
            _logger = logger;
            _userService = userService;
        }

        public override async Task<userResponse> GetUser(userRequest request, ServerCallContext context)
        {
            var user = await _userService.GetUserByIdAsync(request.Id);

            if (user == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "User not found"));
            }

            return new userResponse
            {
                Id = user.UserId,
                Name = user.Name ?? "",
                Email = user.Email ?? "",
                ProfilePictureUrl = user.ProfilePictureUrl ?? ""
            };
        }
    }
}
