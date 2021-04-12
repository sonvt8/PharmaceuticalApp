using api.Entities;
using api.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Data
{
    internal class ContactRepository : IContactRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public ContactRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<FeedBack> GetFeedBackByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<FeedBack>> GetFeedBacksAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(FeedBack feedBack)
        {
            throw new System.NotImplementedException();
        }
    }
}