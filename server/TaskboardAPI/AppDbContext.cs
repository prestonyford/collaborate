using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;

namespace TaskboardAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects => Set<Project>();
        public DbSet<Column> Columns => Set<Column>();
        public DbSet<TaskSummary> TaskSummaries => Set<TaskSummary>();
        public DbSet<Label> Labels => Set<Label>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>()
                .HasIndex(c => c.ProjectID);
            modelBuilder.Entity<TaskSummary>()
                .HasIndex(c => c.ColumnID);
            modelBuilder.Entity<Label>()
                .HasIndex(c => c.ProjectID);
        }
    }
}
