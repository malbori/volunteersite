using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Operations
{
    public class OperationEdit
    {
        public class Command : IRequest
        {
            // Properties here
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
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
                    throw new RestException(HttpStatusCode.NotFound, new {operation = "Not found"});
                }

                operation.Title = req.Title ?? operation.Title;
                operation.Description = req.Description ?? operation.Description;
                operation.Category = req.Category ?? operation.Category;
                operation.Date = req.Date ?? operation.Date;
                operation.City = req.City ?? operation.City;
                operation.Venue = req.Venue ?? operation.Venue;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}