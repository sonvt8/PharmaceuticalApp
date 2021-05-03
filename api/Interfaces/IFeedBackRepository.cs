using api.DTOs;
using api.Entities;
using api.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IFeedBackRepository
    {
        void AddFeedBack(FeedBack feedBack);
        void UpdateFeedBack(FeedBack feedBack);
        void DeleteFeedBack(FeedBack feedBack);

        Task<PagedList<FeedBackDto>> GetFeedBacksPagination(PaginationParams paginationParams);
        Task<IEnumerable<FeedBackDto>> GetFeedBacks();
        Task<IEnumerable<FeedBackDto>> GetFeedBacksOfUserAsync(int userId);
        Task<IEnumerable<FeedBackDto>> GetFeedBacksOfUserApproveAsync(int userId);
        Task<FeedBack> GetFeedBackByIdAsync(int feedBackId);
        Task<UserDto> GetUserOfAFeedBackAsync(int feedBackId);
        Task<bool> FeedBackExists(int feedBackId);
    }
}