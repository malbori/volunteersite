using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Operations;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OperationsController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<Operation>>> List()
        {
            // call Application layer to query data
            return await _mediator.Send(new OperationList.Query());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Operation>> OperationDetails(Guid id)
        {
            return await _mediator.Send(new OperationDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(OperationCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, OperationEdit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new OperationDelete.Command{Id = id});
        }
    }
}