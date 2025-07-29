namespace TaskboardAPI.Request
{
    public class UpdateTaskRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int[]? Labels { get; set; }
    }
}
