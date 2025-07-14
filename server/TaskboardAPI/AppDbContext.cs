using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;

namespace TaskboardAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects => Set<Project>();
    }
}
