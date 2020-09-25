using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EventsController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> List()
        {
            // call Application layer to query data
            return await _mediator.Send(new EventList.Query());
        }
    }
}