using TaskboardAPI.Models;

namespace TaskboardAPI.Response
{
    public class TaskSummariesResponse
    {
        public List<TaskSummary> Tasks { get; set; } = [];
        public bool HasMore { get; set; }
    }
}
