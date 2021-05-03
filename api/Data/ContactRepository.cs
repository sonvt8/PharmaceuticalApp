using api.Entities;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    internal class ContactRepository : IContactRepository
    {
        private DataContext _context;
        private IMapper _mapper;

        public ContactRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddContact(Contact contact)
        {
            _context.Contacts.Add(contact);
        }

        public async Task<bool> ContactExists(int contactId)
        {
            return await _context.Contacts.AnyAsync(c => c.Id == contactId);
        }

        public void DeleteContact(Contact contact)
        {
            _context.Contacts.Remove(contact);
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<PagedList<Contact>> GetContactsPagination(PaginationParams paginationParams)
        {
           
            var query = _context.Contacts
                .AsQueryable();

            if (!string.IsNullOrEmpty(paginationParams.Search))
            {
                query = query.Where(e => e.Name.ToLower().Contains(paginationParams.Search));
            }

            return await PagedList<Contact>.CreateAsync(query.AsNoTracking(),
                    paginationParams.PageNumber, paginationParams.PageSize);
            
        }

        public void UpdateContact(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
        }
    }
}