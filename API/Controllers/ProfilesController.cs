using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query{Username = username});
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(EditProfile.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserOperationDto>>> GetUserOperations(string username, string predicate) 
        {
            return await Mediator.Send(new ListOperations.Query{Username = username, Predicate = predicate});
        }
    }
}