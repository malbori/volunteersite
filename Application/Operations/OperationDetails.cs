using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Operations
{
    public class OperationDetails
    {
        public class Query : IRequest<Operation>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Operation>
        {
            //constructer
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Operation> Handle(Query request, CancellationToken cancellationToken)
            {
                var operation = await _context.Operations.FindAsync(request.Id);
                
                if (operation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { operation = "Not found" });
                }
                return operation;

            }
        }
    }
}