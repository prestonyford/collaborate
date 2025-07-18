namespace TaskboardAPI.Models
{
    public class Label
    {
        public required int Id { get; set; }
        public required int ProjectId { get; set; }
        public required string Title { get; set; }
        public required string Color { get; set; }
    }
}
