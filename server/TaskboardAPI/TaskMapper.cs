using TaskboardAPI.Models;

namespace TaskboardAPI
{
    public static class TaskMapper
    {
        public static TaskSummary ToSummary(ProjectTask task)
        {
            return new TaskSummary{
                Id = task.Id,
                ProjectId = task.ProjectId,
                ColumnId = task.ColumnId,
                Title = task.Title,
                CreationDate = task.CreationDate,
                Labels = task.Labels
            };
        }
    }
}
