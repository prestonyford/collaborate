namespace TaskboardAPI.Request
{
    public class CreateLabelsItem
    {
        public required string Title { get; set; }
        public required string Color { get; set; }
    }
    public class CreateLabelsRequest
    {
        public required CreateLabelsItem[] Labels { get; set; }
    }
}
