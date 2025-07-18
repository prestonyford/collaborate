namespace TaskboardAPI.Models
{
    public class Label
    {
        public int Id { get; set; }
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
    }
}
