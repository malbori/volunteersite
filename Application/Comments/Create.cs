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

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid OperationId { get; set; }
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<CommentDto> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var operation = await _context.Operations.FindAsync(request.OperationId);
                if (operation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Operation = "Not found" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username,
                    cancellationToken);

                var comment = new Comment
                {
                    Author = user,
                    Operation = operation,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                operation.Comments.Add(comment);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving changes");
            }
        }
    }
}