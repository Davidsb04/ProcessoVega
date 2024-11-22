using Microsoft.EntityFrameworkCore;
using ProcessoVega.Models;

namespace ProcessoVega.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public required DbSet<MaterialModel> Materials { get; set; }
        public required DbSet<SupplierModel> Suppliers { get; set; }
    }
}
