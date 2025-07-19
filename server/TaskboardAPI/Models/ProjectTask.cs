namespace TaskboardAPI.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public required int ProjectId { get; set; }
        public required int ColumnId { get; set; }
        public required string Title { get; set; }
        public required long CreationDate { get; set; }
        public required int[] Labels { get; set; }
        public required string CreatedBy { get; set; }
        public required string Description { get; set; }

    }
}
