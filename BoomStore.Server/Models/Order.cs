using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoomStore.Models;

public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public decimal Total { get; set; }

    public List<OrderItem> Items { get; set; } = new();
}