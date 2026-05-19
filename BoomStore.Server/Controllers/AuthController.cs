using BoomStore.Data;
using BoomStore.DTOs;
using BoomStore.Models;
using BoomStore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoomStore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(
        AppDbContext context,
        JwtService jwtService
    )
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = await _context.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (exists)
        {
            return BadRequest(
                new
                {
                    message = "Пользователь уже существует"
                }
            );
        }

        var role = "User";

        /* =========================
           ADMIN CHECK
        ========================= */

        if (
            dto.Name.ToLower() == "admin"
            &&
            dto.Email.ToLower() == "admin@gmail.com"
        )
        {
            role = "Admin";
        }

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(dto.Password),

            Role = role
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        var token = _jwtService.Generate(user);

        return Ok(
            new
            {
                token,

                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                }
            }
        );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.Email == dto.Email
            );

        if (
            user == null
            ||
            !BCrypt.Net.BCrypt.Verify(
                dto.Password,
                user.PasswordHash
            )
        )
        {
            return BadRequest(
                new
                {
                    message = "Неверный логин или пароль"
                }
            );
        }

        var token = _jwtService.Generate(user);

        return Ok(
            new
            {
                token,

                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                }
            }
        );
    }
}