namespace TaskboardAPI.Models
{
    public class ProjectShare
    {
        public required int Id { get; set; }
        public required int ProjectId { get; set; }
        public required string SharedWith { get; set; }
        public required string SharedBy { get; set; }
        public required int SharedTime { get; set; }
    }
}
