namespace BoomStore.DTOs
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }

        public List<Product> Items { get; set; }
            = new();
    }
}
