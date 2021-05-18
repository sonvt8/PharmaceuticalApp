using Microsoft.AspNetCore.Http;

namespace api.DTOs
{
    public class FilesUploadDto
    {
        public string Email { get; set; }
        public IFormFile File { get; set; }
    }
}
