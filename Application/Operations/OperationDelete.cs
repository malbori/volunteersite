using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Operations
{
    public class OperationDelete
    {
        public class Command : IRequest
        {
            // Properties here
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command req, CancellationToken cancellationToken)
            {
                // first get event
                var operation = await _context.Operations.FindAsync(req.Id);

                if (operation == null)
                {
                    throw new Exception("Could not find Event");
                }

                _context.Remove(operation);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem deleting event.");
            }
        }
    }
}