namespace api.Entities
{
    public class PhotoUser
    {
        public int Id { get; set; }
        public string PhotoUserUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}