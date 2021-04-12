using api.Entities;
using api.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Data
{
    internal class UserRepository : IUserRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
           _mapper = mapper;
        }

        public Task<AppUser> GetUserByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<AppUser> GetUserByUsernameAsync(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(AppUser user)
        {
            throw new System.NotImplementedException();
        }
    }
}