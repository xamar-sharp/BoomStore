// OrdersController.cs

using BoomStore.Data;
using BoomStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoomStore.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(
        AppDbContext context
    )
    {
        _context = context;
    }

    /* =========================================
       CREATE ORDER
    ========================================= */

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] List<OrderItem> items
    )
    {
        if (
            items == null
            ||
            items.Count == 0
        )
        {
            return BadRequest(
                "Корзина пуста"
            );
        }

        var userId = int.Parse(
            User.Claims.First(x =>
                x.Type.Contains("nameidentifier")
            ).Value
        );

        decimal total = 0;

        foreach (var item in items)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(x =>
                    x.Id == item.ProductId
                );

            if (product == null)
            {
                return BadRequest(
                    $"Товар {item.ProductId} не найден"
                );
            }

            total +=
                product.Price * item.Quantity;
        }

        var order = new Order
        {
            UserId = userId,
            Total = total,
            Items = items
        };

        _context.Orders.Add(order);

        await _context.SaveChangesAsync();

        return Ok(order);
    }

    /* =========================================
       GET ALL ORDERS
    ========================================= */

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _context.Orders

            .Include(x => x.User)

            .Include(x => x.Items)
            .ThenInclude(x => x.Product)

            .ToListAsync();

        return Ok(orders);
    }

    /* =========================================
       DELETE ORDER
    ========================================= */

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await _context.Orders

            .Include(x => x.Items)

            .FirstOrDefaultAsync(x =>
                x.Id == id
            );

        if (order == null)
        {
            return NotFound();
        }

        _context.OrderItems.RemoveRange(
            order.Items
        );

        _context.Orders.Remove(order);

        await _context.SaveChangesAsync();

        return Ok();
    }
}