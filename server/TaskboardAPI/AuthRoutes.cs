using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using TaskboardAPI.Request;
using TaskboardAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TaskboardAPI.Response;

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

        return Results.Created($"/auth/register", new StatusResponse { Username = newUser.Entity.Username, Email = newUser.Entity.Email });
    }

    private static async Task<IResult> Login(HttpContext ctx, AppDbContext db, [FromBody] LoginRequest request)
    {
        var user = await db.Users.FindAsync(request.Username);
        if (user == null)
        {
            return Results.Unauthorized();
        }
        var hasher = new PasswordHasher<object>();
        var result = hasher.VerifyHashedPassword(null, user.HashedPassword, request.Password);

        if (result == PasswordVerificationResult.Failed)
        {
            return Results.Unauthorized();
        }

        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, request.Username)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await ctx.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        return Results.Ok(new StatusResponse { Username = user.Username, Email = user.Email });
    }

    private static async Task<IResult> Logout(HttpContext ctx)
    {
        await ctx.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Results.Ok("");
    }

    private static async Task<IResult> GetStatus(HttpContext ctx, AppDbContext db)
    {
        if (ctx.User.Identity?.IsAuthenticated == true)
        {
            string? username = ctx.User.Identity.Name;
            if (username == null) { return Results.Unauthorized(); }

            var user = await db.Users.FindAsync(username);
            if (user == null) { return Results.Unauthorized(); }

            return Results.Ok(new StatusResponse { Username = username, Email = user.Email });
        }

        return Results.Unauthorized();
    }
}
