﻿namespace TaskboardAPI.Request
{
    public class CreateTaskRequest
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
