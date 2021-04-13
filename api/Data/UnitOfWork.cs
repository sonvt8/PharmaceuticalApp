using api.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IJobRepository JobRepository => new JobRepository(_context, _mapper);

        public IReviewRepository ReviewRepository => new ReviewRepository(_context, _mapper);

        public IProductRepository ProductRepository => new ProductRepository(_context, _mapper);

        public IContactRepository ContactRepository => new ContactRepository(_context, _mapper);

        public IFeedBackRepository FeedBackRepository => new FeedBackRepository(_context, _mapper);

        public ICategoryRepository CategoryRepository => new CategoryRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }


    }
}
