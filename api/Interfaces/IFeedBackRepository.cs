using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IFeedBackRepository
    {
        void Update(FeedBack feedBack);
        Task<IEnumerable<FeedBack>> GetFeedBacksAsync();
        Task<FeedBack> GetFeedBackByIdAsync(int id);
    }
}