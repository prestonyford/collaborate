namespace TaskboardAPI.Models
{
    public class Project
    {
        public int? Id { get; set; }
        public required string Name { get; set; }
        public required string Owner { get; set; }
    }
}
