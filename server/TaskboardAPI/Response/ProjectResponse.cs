using TaskboardAPI.Models;

namespace TaskboardAPI.Response
{
    public class ProjectResponse
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Owner { get; set; }
        public required int NumColumns { get; set; }
        public required int NumTasks { get; set; }
    }
}
