using Microsoft.EntityFrameworkCore;
using BoomStore.Models;

namespace BoomStore.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Category>().HasData(

        new Category
        {
            Id = 1,
            Name = "Смартфоны"
        },

        new Category
        {
            Id = 2,
            Name = "Ноутбуки"
        },

        new Category
        {
            Id = 3,
            Name = "Наушники"
        }
    );
    }
    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
}