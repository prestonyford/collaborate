namespace TaskboardAPI.Models
{
    public class Column
    {
        public int Id { get; set; }
        public required int ProjectId { get; set; }
        public required string Name { get; set; }
        public required string Color { get; set; }
    }
}
