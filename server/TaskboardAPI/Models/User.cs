namespace TaskboardAPI.Models
{
    public class User
    {
        public required string Username {  get; set; }
        public required string HashedPassword { get; set; }
        public required string Email { get; set; }
    }
}
