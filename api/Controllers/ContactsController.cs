using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class ContactsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ContactsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await _unitOfWork.ContactRepository.GetContactsAsync();

            return Ok(contacts);
        }

        [HttpGet("{contactId}", Name = "GetContactById")]
        public async Task<ActionResult<Contact>> GetContactById(int contactId)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactByIdAsync(contactId);
            if (contact == null)
                return NotFound();
            return contact;
        }

        [HttpPost]
        public async Task<ActionResult> AddContact(Contact contact)
        {
            _unitOfWork.ContactRepository.AddContact(contact);

            await _unitOfWork.Complete();

            return CreatedAtAction("GetContactById", new { contactId = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(int id, Contact contact)
        {

            if (id != contact.Id)
            {
                return BadRequest();
            }
            if (!await _unitOfWork.ContactRepository.ContactExists(id)) return NotFound();

            _unitOfWork.ContactRepository.UpdateContact(contact);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update Contact");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var contact = await _unitOfWork.ContactRepository.GetContactByIdAsync(id);

            if (contact == null) return NotFound();

            _unitOfWork.ContactRepository.DeleteContact(contact);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to delete contact");
        }
    }
}
