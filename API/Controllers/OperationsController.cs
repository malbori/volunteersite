using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Operations;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OperationsController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<OperationDto>>> List()
        {
            // call Application layer to query data
            return await Mediator.Send(new OperationList.Query());
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<OperationDto>> OperationDetails(Guid id)
        {
            return await Mediator.Send(new OperationDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(OperationCreate.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Attend.Command{Id = id});
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsOperationHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, OperationEdit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsOperationHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new OperationDelete.Command{Id = id});
        }


        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id)
        {
            return await Mediator.Send(new Unattend.Command{Id = id});
        }
    }
}