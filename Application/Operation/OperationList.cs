using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Operations
{
    public class OperationList
    {
        public class Query : IRequest<List<Operation>> { }

        public class Handler : IRequestHandler<Query, List<Operation>>
        {
            //constructer
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Operation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Operations.ToListAsync();

                return events;

            }
        }
    }
}