using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IContactRepository
    {
        void Update(FeedBack feedBack);
        Task<IEnumerable<FeedBack>> GetFeedBacksAsync();
        Task<FeedBack> GetFeedBackByIdAsync(int id);
    }
}