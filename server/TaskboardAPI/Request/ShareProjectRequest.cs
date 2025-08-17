namespace TaskboardAPI.Request
{
    public class ShareProjectRequest
    {
        public required int ProjectId { get; set; }
        public required string[] Usernames { get; set; }
    }
}
