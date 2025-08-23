namespace TaskboardAPI.Request
{
    public class CreateProjectRequest
    {
        public required string Name { get; set; }
        public required string[] Usernames { get; set; }
    }
}
