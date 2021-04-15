namespace api.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }

        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}