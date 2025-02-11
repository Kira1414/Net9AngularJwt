using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Custom;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly DbpruebajwtContext _context;
        private readonly Helpers _helpers;
        public AccessController(DbpruebajwtContext context, Helpers helpers)
        {
            _context = context;
            _helpers = helpers;
        }
        
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            var modelUser = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                Password = _helpers.EncryptSHA256(userDTO.Password!)
            };

            await _context.Users.AddAsync(modelUser);
            await _context.SaveChangesAsync();

            if(modelUser.Id > 0)
            {
                return Ok(new { message = "User created successfully", isSuccess=true });
            }
            else
            {
                return BadRequest(new { message = "Error creating user", isSuccess=false });
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO userDTO)
        {
            var userFind = await _context.Users.Where(where => where.Email == userDTO.Email && where.Password == _helpers.EncryptSHA256(userDTO.Password!)).FirstOrDefaultAsync();

            if(userFind == null)
            {
                return BadRequest(new { message = "Invalid credentials", token="", isSuccess=false });
            }
            else
            {
                return Ok(new { message = "User find", isSuccess=true, token = _helpers.GenerateJWT(userFind) });
            }
        }
    }

}
