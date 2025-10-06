using API.DTOs;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{

    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        throw new UnauthorizedException("You are not authorized to access this resource.");
    }

    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        throw new NotFoundException("The requested resource was not found.");
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        throw new BadRequestException("This was not a good request.");
    }

    /*  [HttpGet("auth")]
       public IActionResult GetAuth()
       {
           return Unauthorized();
       }
       [HttpGet("not-found")]
       public IActionResult GetNotFound()
       {
           return NotFound();
       }
       [HttpGet("server-error")]
       public IActionResult GetServerError()
       {
           throw new Exception("This is a server error");
       }
       [HttpGet("bad-request")]
       public IActionResult GetBadRequest()
       {
           return BadRequest("This was not a good requeest");
       } */

}

