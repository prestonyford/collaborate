namespace TaskboardAPI.Models
{
    public class Column
    {
        public required int Id { get; set; }
        public required int ProjectID { get; set; }
        public required string Name { get; set; }
        public required string Color { get; set; }
    }
}
