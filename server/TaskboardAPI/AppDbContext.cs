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
        public DbSet<ProjectTask> Tasks => Set<ProjectTask>();
        public DbSet<Label> Labels => Set<Label>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Column>()
                .HasIndex(c => c.ProjectId);
            modelBuilder.Entity<ProjectTask>()
                .HasIndex(c => c.ColumnId);
            modelBuilder.Entity<Label>()
                .HasIndex(c => c.ProjectId);
        }
    }
}
