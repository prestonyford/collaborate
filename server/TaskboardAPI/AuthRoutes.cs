using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using TaskboardAPI.Request;
using TaskboardAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace TaskboardAPI;

public static class AuthRoutes
{
    public static IEndpointRouteBuilder MapAuthRoutes(this IEndpointRouteBuilder app)
    {
        var authRoutes = app.MapGroup("/auth");

        authRoutes.MapPost("/login", Login);
        authRoutes.MapPost("/logout", Logout);
        authRoutes.MapPost("/register", Register);
        authRoutes.MapGet("/status", GetStatus);

        return app;
    }
    private static async Task<IResult> Register([FromBody] RegisterRequest request, HttpContext ctx, AppDbContext db)
    {
        var user = await db.Users.FindAsync(request.Username);
        if (user != null)
        {
            return Results.Conflict();
        }
        var hasher = new PasswordHasher<object>();
        string hashedPassword = hasher.HashPassword(null, request.Password);
        var newUser = db.Users.Add(new User { Username = request.Username, Email = request.Email, HashedPassword = hashedPassword });
        await db.SaveChangesAsync();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, newUser.Entity.Username),
        };

        var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await ctx.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));

        return Results.Created($"/auth/register", new { username = newUser.Entity.Username });
    }

    private static async Task<IResult> Login(HttpContext ctx, [FromBody] LoginRequest request)
    {
        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, request.Username)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await ctx.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        return Results.Ok();
    }

    private static async Task<IResult> Logout(HttpContext ctx)
    {
        await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Results.Ok("");
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
