using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class EventList
    {
        public class Query : IRequest<List<Event>> { }

        public class Handler : IRequestHandler<Query, List<Event>>
        {
            //constructer
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Events.ToListAsync();

                return events;

            }
        }
    }
}