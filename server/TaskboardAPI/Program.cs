using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI;
using TaskboardAPI.Models;
using TaskboardAPI.Request;
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

projectRoutes.MapPost("/columns", async (int pid, CreateColumnRequest request, AppDbContext db) =>
{
    Column column = new() { Name = request.Name, Color = request.Color, ProjectId = pid };
    await db.Columns.AddAsync(column);
    await db.SaveChangesAsync();
    return Results.Created($"/api/projects/{pid}/columns/{column.Id}", column);
});

projectRoutes.MapGet("/columns", async (int pid, AppDbContext db) =>
{
    return await db.Columns.Where(c => c.ProjectId == pid).ToListAsync();
});

projectRoutes.MapPost("/columns/{cid}/tasks", async (int pid, int cid, CreateTaskRequest request, AppDbContext db) =>
{
    TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
    ProjectTask task = new() { ProjectId = pid, ColumnId = cid, Title = request.Title, Description = request.Description, Labels = [], CreatedBy = "", CreationDate = (long)t.TotalMilliseconds };
    await db.Tasks.AddAsync(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/projects/{pid}/tasks/{task.Id}", task);
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

projectRoutes.MapPatch("/tasks/{tid}", async (int pid, int tid, UpdateTaskRequest request, AppDbContext db) =>
{
    ProjectTask? task = await db.Tasks.FindAsync(tid);
    if (task == null)
    {
        return Results.NotFound();
    }
    if (request.Description != null)
    {
        task.Description = request.Description;
    }
    if (request.Title != null)
    {
        task.Title = request.Title;
    }
    await db.SaveChangesAsync();
    return Results.Ok(task);
});

app.Run();
