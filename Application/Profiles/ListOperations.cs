using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListOperations
    {
        public class Query : IRequest<List<UserOperationDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserOperationDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserOperationDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = user.UserOperations
                    .OrderBy(a => a.Operation.Date)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where(a => a.Operation.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where(a => a.IsHost);
                        break;
                    default:
                        queryable = queryable.Where(a => a.Operation.Date >= DateTime.Now);
                        break;
                }

                var operations = queryable.ToList();
                var operationsToReturn = new List<UserOperationDto>();

                foreach (var operation in operations)
                {
                    var userOperation = new UserOperationDto
                    {
                        Id = operation.Operation.Id,
                        Title = operation.Operation.Title,
                        Category = operation.Operation.Category,
                        Date = operation.Operation.Date
                    };

                    operationsToReturn.Add(userOperation);
                }

                return operationsToReturn;
            }
        }
    }
}