using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using TaskboardAPI.Request;

namespace TaskboardAPI;

public static class AuthRoutes
{
    public static IEndpointRouteBuilder MapAuthRoutes(this IEndpointRouteBuilder app)
    {
        var authRoutes = app.MapGroup("/auth");

        authRoutes.MapPost("/login", Login);
        authRoutes.MapPost("/logout", Logout);
        authRoutes.MapGet("/status", GetStatus);

        return app;
    }

    private static async Task<IResult> Login(HttpContext ctx, LoginRequest request)
    {
        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, request.Username)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await ctx.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        return Results.Ok("Logged in");
    }

    private static async Task<IResult> Logout(HttpContext ctx)
    {
        await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Results.Ok("Logged out");
    }

    private static IResult GetStatus(HttpContext ctx)
    {
        if (ctx.User.Identity?.IsAuthenticated == true)
        {
            return Results.Ok(new { Status = true });
        }

        return Results.Unauthorized();
    }
}
