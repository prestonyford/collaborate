namespace TaskboardAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string ColumnID { get; set; }
        public string Title { get; set; }
        public DateTime CreationDate { get; set; }
        public Label[] Labels { get; set; }
        public string CreatedBy { get; set; }
        public string Description { get; set; }

    }
}
