using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IJobRepository JobRepository { get; }
        IReviewRepository ReviewRepository { get; }
        IProductRepository ProductRepository { get; }
        IContactRepository ContactRepository { get; }
        IFeedBackRepository FeedBackRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ICandidateRepository CandidateRepository { get; }
        IFileRepository FileRepository { get; }
        IHistoryRepository HistoryRepository { get; }
        Task<bool> Complete();
    }
}
