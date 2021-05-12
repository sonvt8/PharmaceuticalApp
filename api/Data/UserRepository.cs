using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public void DeleteUser(AppUser user)
        {
            _context.Users.Remove(user);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(p => p.PhotoUsers)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            return await _context.Users
                .Include(u => u.PhotoUsers)
                .Include(u => u.FeedBacks)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PagedList<UserDto>> GetUsersPagination(PaginationParams paginationParams)
        {
            var query = _context.Users
                .Include(p => p.PhotoUsers)
                .AsQueryable();

            if (!string.IsNullOrEmpty(paginationParams.Search))
            {
                query = query.Where(e => e.FullName.ToLower().Contains(paginationParams.Search));
            }

            return await PagedList<UserDto>.CreateAsync(query.ProjectTo<UserDto>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<PagedList<UserDto>> GetUsersWithRolesPagination(PaginationParams paginationParams)
        {
            var query = _context.Users
                        .Include(r => r.UserRoles)
                        .ThenInclude(r => r.Role)
                        .OrderBy(u => u.FullName)
                        .AsQueryable()
                       .Select(u => new UserDto
                       {
                           Id = u.Id,
                           Email = u.Email,
                           FullName = u.FullName,
                           Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                       });

            if (!string.IsNullOrEmpty(paginationParams.Search))
            {
                query = query.Where(e => e.FullName.ToLower().Contains(paginationParams.Search));
            }

            return await PagedList<UserDto>.CreateAsync(query,
                    paginationParams.PageNumber, paginationParams.PageSize);
        }

        public void UpdateUser(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

    }
}