namespace api.Entities
{
    public class CandidateJob
    {
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}