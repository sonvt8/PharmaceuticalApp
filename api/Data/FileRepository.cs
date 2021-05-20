using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    internal class FileRepository : IFileRepository
    {
        private DataContext _context;
        public FileRepository(DataContext context)
        {
            _context = context;
        }
        public void AddFiles(Download fileToUploaded)
        {
            _context.Downloads.Add(fileToUploaded);
        }

        public void DeleteFiles(Download fileToDeleted)
        {
            _context.Downloads.Remove(fileToDeleted);
        }

        public async Task<IEnumerable<Download>> GetFilesOfACandidateAsync(int id)
        {
            return await _context.Downloads
                .Where(d => d.AppUserId == id)
                .ToListAsync();
        }
    }
}
