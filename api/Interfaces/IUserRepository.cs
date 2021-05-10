using api.DTOs;
using api.Entities;
using api.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        void DeleteUser(AppUser user);
        void UpdateUser(AppUser user);
        //Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<PagedList<UserDto>> GetUsersPagination(PaginationParams paginationParams);
        Task<PagedList<UserDto>> GetUsersWithRolesPagination(PaginationParams paginationParams);
        //Task<AppUser> GetUserByUsernameAsync(string username);
        //Task<IEnumerable<MemberDto>> GetMembersAsync();
        //Task<MemberDto> GetMemberAsync(string username);
    }
}