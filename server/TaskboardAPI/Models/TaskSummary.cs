namespace TaskboardAPI.Models
{
    public class TaskSummary
    {
        public int Id { get; set; }
        public int ColumnID { get; set; }
        public required string Title { get; set; }
        public long CreationDate { get; set; }
        public required List<int> Labels { get; set; }

    }
}
