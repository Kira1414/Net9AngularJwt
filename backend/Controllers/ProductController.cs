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
    [Authorize]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DbpruebajwtContext _context;
        public ProductController(DbpruebajwtContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> List()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
    }
}
