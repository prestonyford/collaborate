using System.Security.Cryptography;
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
projectRoutes.MapGet("", async (int pid, AppDbContext db) =>
{
    var project = await db.Projects.FindAsync(pid);
    if (project == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(project);
});
projectRoutes.MapGet("/labels", async (int pid, AppDbContext db) =>
{
    return await db.Labels.Where(l => l.ProjectId == pid).ToListAsync();
});
projectRoutes.MapGet("/columns", async (int pid, AppDbContext db) =>
{
    return await db.Columns.Where(c => c.ProjectId == pid).ToListAsync();
});
projectRoutes.MapGet("/columns/{cid}/taskSummaries", async (int pid, int cid, AppDbContext db) =>
{
    var tasks = await db.Tasks.Where(t => t.ProjectId == pid && t.ColumnId == cid).ToListAsync();
    var taskSummaries = tasks.Select<ProjectTask, TaskSummary>(task => TaskMapper.ToSummary(task));
    return new TaskSummariesResponse { HasMore = false, Tasks = taskSummaries.ToList() };
});
projectRoutes.MapGet("/tasks/{tid}", async (int pid, int tid, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(tid);
    if (task == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(task);
});

app.Run();
