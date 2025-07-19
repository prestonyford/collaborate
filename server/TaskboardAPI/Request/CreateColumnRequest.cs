namespace TaskboardAPI.Request
{
    public class CreateColumnRequest
    {
        public required string Name { get; set; }
        public required string Color { get; set; }
    }
}
