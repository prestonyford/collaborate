using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("taskboard"));
//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
//{
//    options.Cookie.Name = "auth";
//    options.Cookie.HttpOnly = true;
//    options.ExpireTimeSpan = TimeSpan.FromHours(2);
//    options.SlidingExpiration = true;
//});

var app = builder.Build();
//app.UseAuthentication();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    FakeDataSeeder.Seed(db);
}

app.MapAuthRoutes();

var apiRoutes = app.MapGroup("/api");
apiRoutes.MapProjectRoutes();

app.Run();
