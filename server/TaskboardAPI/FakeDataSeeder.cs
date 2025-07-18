namespace TaskboardAPI
{
    public static class FakeDataSeeder
    {
        public static void Seed(AppDbContext db)
        {
            if (!db.Projects.Any())
            {
                db.Projects.AddRange(
                    new() { Id = 1, Name = "Project 1", Owner = "Preston Ford", NumColumns = 2, NumTasks = 3 },
                    new() { Id = 2, Name = "Project 2", Owner = "Preston Ford", NumColumns = 7, NumTasks = 8 }
                );
            }

            if (!db.Columns.Any())
            {
                db.Columns.AddRange(
                    new() { Id = 1, ProjectId = 1, Name = "Column 1", Color = "#f44336" },
                    new() { Id = 2, ProjectId = 1, Name = "Column 2", Color = "#00D3F2" },
                    new() { Id = 3, ProjectId = 1, Name = "Column 3", Color = "#BBF451" }
                );
            }

            if (!db.Tasks.Any())
            {
                db.Tasks.AddRange(
                    new()
                    {
                        Id = 1,
                        ProjectId = 1,
                        Title = "Task 1",
                        ColumnId = 1,
                        CreationDate = 1750383235022,
                        Labels = [1],
                        CreatedBy = "pyford",
                        Description = "Hello, world!"
                    },
                    new()
                    {
                        Id = 2,
                        ProjectId = 1,
                        Title = "Task 2",
                        ColumnId = 2,
                        CreationDate = 1750383235023,
                        Labels = [1],
                        CreatedBy = "pyford",
                        Description = "Hello, world 2!"
                    }
                );
            }

            if (!db.Labels.Any())
            {
                db.Labels.AddRange(
                    new() { Id = 1, ProjectId = 1, Color = "#f44336", Title = "Label 1" },
                    new() { Id = 2, ProjectId = 1, Color = "#2196f3", Title = "Label 2" }
                );
            }

            db.SaveChanges();
        }
    }
}
