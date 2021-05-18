using api.DTOs;
using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IHistoryRepository
    {
        void AddHistory(AppliedJobHistory history);
        void UpdateHistory(AppliedJobHistory history);
        Task<IEnumerable<CareerProfileDto>> GetHistoriesById(int id);
    }
}
