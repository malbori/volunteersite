using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Operations
{
    public class OperationDetails
    {
        public class Query : IRequest<OperationDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OperationDto>
        {
            //constructer
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<OperationDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var operation = await _context.Operations.FindAsync(request.Id);

                if (operation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { operation = "Not found" });
                }

                var eventToReturn = _mapper.Map<Operation, OperationDto>(operation);
                return eventToReturn;

            }
        }
    }
}