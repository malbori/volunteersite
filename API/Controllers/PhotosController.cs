using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        //Need to use FromForm to give controller hint on where to look
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]PhotoAdd.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new PhotoDelete.Command{Id = id});
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await Mediator.Send(new PhotoSetMain.Command{Id = id});
        }
    }
}