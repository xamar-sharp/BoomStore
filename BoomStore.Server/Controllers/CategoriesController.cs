using Microsoft.AspNetCore.Mvc;
using BoomStore.Data;
using BoomStore.Models;

namespace BoomStore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Categories.ToList());
    }
}