using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;
using TaskboardAPI.Request;
using TaskboardAPI.Response;

namespace TaskboardAPI
{
    public static class UserRoutes
    {

        public static IEndpointRouteBuilder MapUserRoutes(this IEndpointRouteBuilder routeGroupBuilder)
        {
            var userRoutes = routeGroupBuilder.MapGroup("/users");
            userRoutes.MapGet("/{username}", GetUser);

            return routeGroupBuilder;
        }

        private static async Task<IResult> GetUser(AppDbContext db, string username)
        {
            User? user = await db.Users.FindAsync(username);
            if (user == null)
            {
                return Results.NotFound();
            }
            StatusResponse response = new() { Email = user.Email, Username = user.Username };
            return Results.Ok(response);
        }
    }
}
