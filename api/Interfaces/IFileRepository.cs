using api.Entities;

namespace api.Interfaces
{
    public interface IFileRepository
    {
        void AddFiles(Download fileToUploaded);
        void DeleteFiles(Download fileToDeleted);
    }
}
