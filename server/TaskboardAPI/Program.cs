using Microsoft.EntityFrameworkCore;
using TaskboardAPI;
using TaskboardAPI.Models;
using TaskboardAPI.Response;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("taskboard"));
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    FakeDataSeeder.Seed(db);
}

var apiRoutes = app.MapGroup("/api");

apiRoutes.MapGet("/projects", async (AppDbContext db) =>
{
    return await db.Projects.ToListAsync();
});

var projectRoutes = apiRoutes.MapGroup("/projects/{pid}");
projectRoutes.MapGet("/labels", async (int pid, AppDbContext db) =>
{
    return await db.Labels.Where(l => l.ProjectID == pid).ToListAsync();
});
projectRoutes.MapGet("/columns", async (int pid, AppDbContext db) =>
{
    return await db.Columns.Where(c => c.ProjectID == pid).ToListAsync();
});
projectRoutes.MapGet("/columns/{cid}/taskSummaries", async (int pid, int cid, AppDbContext db) =>
{
    var tasks = await db.TaskSummaries.Where(t => t.ProjectID == pid && t.ColumnID == cid).ToListAsync();
    return new TaskSummariesResponse { HasMore = false, Tasks = tasks };
});

app.Run();
