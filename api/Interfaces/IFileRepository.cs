using api.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IFileRepository
    {
        void AddFiles(Download fileToUploaded);
        void DeleteFiles(Download fileToDeleted);
        Task<IEnumerable<Download>> GetFilesOfACandidateAsync(int id);
    }
}
