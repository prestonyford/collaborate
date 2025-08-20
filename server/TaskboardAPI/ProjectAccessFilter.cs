
using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;

namespace TaskboardAPI
{
    public class ProjectAccessFilter : IEndpointFilter
    {
        private readonly AppDbContext _db;
        public ProjectAccessFilter(AppDbContext db) {
            this._db = db;
        }
        public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
        {
            return await next(context);
            string? username = context.HttpContext.User?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                return Results.Unauthorized();
            }

            int pid = context.GetArgument<int>(0);
            Project? project = await GetProjectIfHasAccess(pid, username);
            if (project == null) {
                return Results.Forbid();
            }

            return await next(context);
        }

        private async Task<Project?> GetProjectIfHasAccess(int pid, string username)
        {
            return await _db.Projects
                .Where(p => p.Id == pid &&
                    (p.Owner == username || _db.ProjectShares.Any(s => s.ProjectId == pid && s.SharedWith == username)))
                .FirstOrDefaultAsync();
        }
    }
}
