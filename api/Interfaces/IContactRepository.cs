using api.Entities;
using api.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IContactRepository
    {
        void DeleteContact(Contact contact);
        void AddContact(Contact contact);
        void UpdateContact(Contact contact);

        Task<PagedList<Contact>> GetContactsPagination(PaginationParams paginationParams);
        Task<IEnumerable<Contact>> GetContactsAsync();
        Task<Contact> GetContactByIdAsync(int id);
        Task<bool> ContactExists(int contactId);
    }
}