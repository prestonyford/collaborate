using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using TaskboardAPI.Models;

namespace TaskboardAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<ProjectShare> ProjectShares => Set<ProjectShare>();
        public DbSet<Column> Columns => Set<Column>();
        public DbSet<ProjectTask> Tasks => Set<ProjectTask>();
        public DbSet<Label> Labels => Set<Label>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Username);
            modelBuilder.Entity<ProjectShare>()
                .HasIndex(c => c.SharedWith);
            modelBuilder.Entity<ProjectShare>()
                .HasIndex(c => c.ProjectId);
            modelBuilder.Entity<Column>()
                .HasIndex(c => c.ProjectId);
            modelBuilder.Entity<ProjectTask>()
                .HasIndex(c => c.ColumnId);
            modelBuilder.Entity<Label>()
                .HasIndex(c => c.ProjectId);
        }
    }
}
