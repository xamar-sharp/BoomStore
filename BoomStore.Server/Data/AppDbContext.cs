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
            },

            new Category
            {
                Id = 4,
                Name = "Планшеты"
            },

            new Category
            {
                Id = 5,
                Name = "Смарт-часы"
            },

            new Category
            {
                Id = 6,
                Name = "Мониторы"
            },

            new Category
            {
                Id = 7,
                Name = "Игровые консоли"
            },

            new Category
            {
                Id = 8,
                Name = "Телевизоры"
            },

            new Category
            {
                Id = 9,
                Name = "Клавиатуры"
            },

            new Category
            {
                Id = 10,
                Name = "Компьютерные мыши"
            },

            new Category
            {
                Id = 11,
                Name = "Видеокарты"
            },

            new Category
            {
                Id = 12,
                Name = "Процессоры"
            },

            new Category
            {
                Id = 13,
                Name = "Колонки"
            },

            new Category
            {
                Id = 14,
                Name = "Веб-камеры"
            },

            new Category
            {
                Id = 15,
                Name = "Микрофоны"
            }
    );
    }
    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
}