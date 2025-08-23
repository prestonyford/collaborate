using System.Security.Cryptography;
using System.Threading.Tasks;
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
        routeGroupBuilder.MapPost("/projects", CreateProject);

        var projectRoutes = routeGroupBuilder.MapGroup("/projects/{pid}");
        projectRoutes.AddEndpointFilter<ProjectAccessFilter>();

        projectRoutes.MapGet("", GetProjectById);
        projectRoutes.MapPatch("", UpdateProject);
        projectRoutes.MapGet("/labels", GetProjectLabels);
        projectRoutes.MapGet("/labelCounts", GetProjectLabelCounts);
        projectRoutes.MapPost("/columns", CreateColumn);
        projectRoutes.MapGet("/columns", GetColumns);
        projectRoutes.MapPost("/columns/{cid}/tasks", CreateTask);
        projectRoutes.MapGet("/columns/{cid}/taskSummaries", GetTaskSummaries);
        projectRoutes.MapGet("/tasks/{tid}", GetTaskById);
        projectRoutes.MapPatch("/tasks/{tid}", UpdateTask);
        projectRoutes.MapGet("/shares", GetProjectShares);
        projectRoutes.MapPost("/shares", ShareProject);

        return routeGroupBuilder;
    }
    private static async Task<IResult> GetAllProjects(AppDbContext db, HttpContext ctx)
    {
        var response = await db.Projects
            .Select(p => new ProjectResponse
            {
                Id = p.Id!.Value,
                Name = p.Name,
                Owner = p.Owner,
                NumColumns = db.Columns.Count(c => c.ProjectId == p.Id),
                NumTasks = db.Tasks.Count(t => t.ProjectId == p.Id)
            })
            .ToArrayAsync();

        return Results.Ok(response);
    }

    private static async Task<IResult> GetProjectById(int pid, AppDbContext db)
    {
        var project = await db.Projects.FindAsync(pid);
        if (project == null)
        {
            return Results.NotFound();
        }

        var numColumns = await db.Columns.Where(c => c.ProjectId == pid).CountAsync();
        var numTasks = await db.Tasks.Where(c => c.ProjectId == pid).CountAsync();
        ProjectResponse response = new() { Id = pid, Name = project.Name, Owner = project.Owner, NumColumns = numColumns, NumTasks = numTasks };
        return Results.Ok(response);
    }

    private static async Task<IResult> CreateProject([FromBody] CreateProjectRequest request, AppDbContext db, HttpContext ctx)
    {
        string? name = ctx.User?.Identity?.Name;
        if (name == null)
        {
            return Results.Unauthorized();
        }
        if (request.Name == null || request.Name == "")
        {
            return Results.BadRequest("Project name cannot be empty.");
        }
        Project project = new()
        {
            Name = request.Name,
            Owner = name
        };
        await db.Projects.AddAsync(project);
        await db.SaveChangesAsync();
        if (project.Id == null)
        {
            return Results.StatusCode(500);
        }
        await ShareProject(project.Id.Value, new ShareProjectRequest { ProjectId = project.Id.Value, Usernames = request.Usernames }, db, ctx);
        ProjectResponse response = new() { Id = project.Id.Value, Name = project.Name, Owner = project.Owner, NumColumns = 0, NumTasks = 0 };

        return Results.Created($"/api/projects/{project.Id}", response);
    }

    private static async Task<IResult> UpdateProject(int pid, [FromBody] UpdateProjectRequest request, AppDbContext db)
    {
        var project = await db.Projects.FindAsync(pid);
        if (project == null)
        {
            return Results.NotFound();
        }

        if (request.Name != null)
        {
            project.Name = request.Name;
        }

        await db.SaveChangesAsync();
        var numColumns = await db.Columns.Where(c => c.ProjectId == pid).CountAsync();
        var numTasks = await db.Tasks.Where(c => c.ProjectId == pid).CountAsync();
        ProjectResponse response = new() { Id = pid, Name = project.Name, Owner = project.Owner, NumColumns = numColumns, NumTasks = numTasks };
        return Results.Ok(response);
    }

    private static async Task<IResult> GetProjectLabels(int pid, AppDbContext db)
    {
        var labels = await db.Labels.Where(l => l.ProjectId == pid).ToListAsync();
        return Results.Ok(labels);
    }
    private static async Task<IResult> GetProjectLabelCounts(int pid, AppDbContext db)
    {
        var tasks = await db.Tasks.Where(t => t.ProjectId == pid).ToListAsync();
        var labelToNumTasks = new Dictionary<int, int>();
        foreach (var task in tasks)
        {
            foreach (var label in task.Labels)
            {
                labelToNumTasks[label] = labelToNumTasks.GetValueOrDefault(label, 0) + 1;
            }
        }

        return Results.Ok(labelToNumTasks);
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
        string? name = ctx.User?.Identity?.Name;
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
            Labels = request.Labels,
            CreatedBy = name,
            CreationDate = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
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

        if (request.Labels != null)
        {
            task.Labels = request.Labels;
        }

        await db.SaveChangesAsync();
        return Results.Ok(task);
    }

    private static async Task<IResult> GetProjectShares(int pid, AppDbContext db)
    {
        var shares = await db.ProjectShares.Where(s => s.ProjectId == pid).ToArrayAsync();
        if (shares == null)
        {
            return Results.Ok(Array.Empty<ProjectShare>());
        };

        return Results.Ok(shares);
    }
    private static async Task<IResult> ShareProject(int pid, [FromBody] ShareProjectRequest request, AppDbContext db, HttpContext ctx)
    {
        TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
        string? creator = ctx.User?.Identity?.Name;
        if (creator == null)
        {
            return Results.Unauthorized();
        }

        var existingShares = await db.ProjectShares.Where(s => s.ProjectId == pid).ToArrayAsync();
        var alreadySharedUsers = existingShares.Select(s => s.SharedWith).ToHashSet();

        ProjectShare[] addedShares = request.Usernames
            .Where(username => !alreadySharedUsers.Contains(username))
            .Select(username => new ProjectShare() {
                ProjectId = pid,
                SharedWith = username,
                SharedBy = creator,
                SharedTime = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            }).ToArray();

        var requestUsernamesSet = request.Usernames.ToHashSet();
        ProjectShare[] removedShares = existingShares
            .Where(share => !requestUsernamesSet.Contains(share.SharedWith))
            .ToArray();

        await db.ProjectShares.AddRangeAsync(addedShares);
        db.ProjectShares.RemoveRange(removedShares);
        await db.SaveChangesAsync();

        var response = await db.ProjectShares.Where(s => s.ProjectId == pid).ToArrayAsync();
        return Results.Ok(response);
    }
}
