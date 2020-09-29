using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Operations
{
    public class OperationList
    {
        public class Query : IRequest<List<OperationDto>> { }

        public class Handler : IRequestHandler<Query, List<OperationDto>>
        {
            //constructer
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<OperationDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Operations.Include(x => x.UserOperations).ThenInclude(x => x.AppUser).ToListAsync();

                return _mapper.Map<List<Operation>, List<OperationDto>>(events);

            }
        }
    }
}