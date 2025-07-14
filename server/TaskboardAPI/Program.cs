using Microsoft.EntityFrameworkCore;
using TaskboardAPI;
using TaskboardAPI.Models;
using TaskboardAPI.Response;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("taskboard"));
var app = builder.Build();

var apiRoutes = app.MapGroup("/api");

apiRoutes.MapGet("/projects", (AppDbContext db) =>
{
    return new List<Project>
    {
        new() { Id = 1, Name = "Project 1", Owner = "Preston Ford", NumColumns = 2, NumTasks = 3 },
        new() { Id = 2, Name = "Project 2", Owner = "Preston Ford", NumColumns = 7, NumTasks = 8 }
    };
});


var projectRoutes = apiRoutes.MapGroup("/projects/{pid}");
projectRoutes.MapGet("/labels", (int pid) =>
{
    return new List<Label>
    {
        new() { Id = 1, Color = "#f44336", Title = "Label 1" }
    };
});
projectRoutes.MapGet("/columns", (int pid) =>
{
    return new List<Column>
    {
        new() { Id = 1, Name = "Column 1", Color = "#f44336" }
    };
});
projectRoutes.MapGet("/columns/{cid}/taskSummaries", (int pid, int cid) =>
{
    return new TaskSummariesResponse
    {
        Tasks = new List<TaskSummary>
        {
            new() {
                Id = 1,
                Title = "Task 1",
                ColumnID = 1,
                CreationDate = 1750383235022,
                Labels = [1]
            }
        },
        HasMore = false
    };
});

app.Run();
