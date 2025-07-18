namespace TaskboardAPI.Models
{
    public class TaskSummary
    {
        public required int Id { get; set; }
        public required int ProjectID { get; set; }
        public required int ColumnID { get; set; }
        public required string Title { get; set; }
        public required long CreationDate { get; set; }
        public required List<int> Labels { get; set; }

    }
}
