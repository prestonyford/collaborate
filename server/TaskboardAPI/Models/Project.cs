namespace TaskboardAPI.Models
{
    public class Project
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required int NumColumns { get; set; }
        public required int NumTasks { get; set; }
        public required string Owner { get; set; }
    }
}
