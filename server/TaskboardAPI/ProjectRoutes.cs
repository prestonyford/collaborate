using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;
using TaskboardAPI.Request;
using TaskboardAPI.Response;

namespace TaskboardAPI;
public static class ProjectRoutes
{
    public static IEndpointRouteBuilder MapProjectRoutes(this IEndpointRouteBuilder routeGroupBuilder)
    {
        routeGroupBuilder.MapGet("/projects", GetAllProjects);

        var projectRoutes = routeGroupBuilder.MapGroup("/projects/{pid}");

        projectRoutes.MapGet("", GetProjectById);
        projectRoutes.MapGet("/labels", GetProjectLabels);
        projectRoutes.MapPost("/columns", CreateColumn);
        projectRoutes.MapGet("/columns", GetColumns);
        projectRoutes.MapPost("/columns/{cid}/tasks", CreateTask);
        projectRoutes.MapGet("/columns/{cid}/taskSummaries", GetTaskSummaries);
        projectRoutes.MapGet("/tasks/{tid}", GetTaskById);
        projectRoutes.MapPatch("/tasks/{tid}", UpdateTask);

        return routeGroupBuilder;
    }

    private static async Task<IResult> GetAllProjects(AppDbContext db)
    {
        var projects = await db.Projects.ToListAsync();
        return Results.Ok(projects);
    }

    private static async Task<IResult> GetProjectById(int pid, AppDbContext db)
    {
        var project = await db.Projects.FindAsync(pid);
        if (project == null)
        {
            return Results.NotFound();
        }
        return Results.Ok(project);
    }

    private static async Task<IResult> GetProjectLabels(int pid, AppDbContext db)
    {
        var labels = await db.Labels.Where(l => l.ProjectId == pid).ToListAsync();
        return Results.Ok(labels);
    }

    private static async Task<IResult> CreateColumn(int pid, CreateColumnRequest request, AppDbContext db)
    {
        Column column = new()
        {
            Name = request.Name,
            Color = request.Color,
            ProjectId = pid
        };
        await db.Columns.AddAsync(column);
        await db.SaveChangesAsync();
        return Results.Created($"/api/projects/{pid}/columns/{column.Id}", column);
    }

    private static async Task<IResult> GetColumns(int pid, AppDbContext db)
    {
        var columns = await db.Columns.Where(c => c.ProjectId == pid).ToListAsync();
        return Results.Ok(columns);
    }

    private static async Task<IResult> CreateTask(int pid, int cid, [FromBody] CreateTaskRequest request, AppDbContext db, HttpContext ctx)
    {
        TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
        string? name = ctx?.User?.Identity?.Name;
        if (name == null)
        {
            return Results.Unauthorized();
        }

        ProjectTask task = new()
        {
            ProjectId = pid,
            ColumnId = cid,
            Title = request.Title,
            Description = request.Description,
            Labels = [],
            CreatedBy = name,
            CreationDate = (long)t.TotalMilliseconds
        };

        await db.Tasks.AddAsync(task);
        await db.SaveChangesAsync();
        return Results.Created($"/api/projects/{pid}/tasks/{task.Id}", task);
    }

    private static async Task<TaskSummariesResponse> GetTaskSummaries(int pid, int cid, AppDbContext db)
    {
        var tasks = await db.Tasks.Where(t => t.ProjectId == pid && t.ColumnId == cid).ToListAsync();
        var taskSummaries = tasks.Select(TaskMapper.ToSummary).ToList();

        return new TaskSummariesResponse
        {
            HasMore = false,
            Tasks = taskSummaries
        };
    }

    private static async Task<IResult> GetTaskById(int pid, int tid, AppDbContext db)
    {
        var task = await db.Tasks.FindAsync(tid);
        if (task == null)
        {
            return Results.NotFound();
        }
        return Results.Ok(task);
    }

    private static async Task<IResult> UpdateTask(int pid, int tid, UpdateTaskRequest request, AppDbContext db)
    {
        var task = await db.Tasks.FindAsync(tid);
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
    }
}
