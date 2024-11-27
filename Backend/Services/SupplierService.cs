using Microsoft.EntityFrameworkCore;
using ProcessoVega.Data;
using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly Context _context;

        public SupplierService(Context context)
        {
            _context = context;
        }        

        public async Task<IEnumerable<SupplierModel>> SuppliersToList()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<SupplierModel?> GetSupplierById(int supplierId)
        {
            var supplier = await _context.Suppliers.SingleOrDefaultAsync(x => x.Id == supplierId);

            if (supplier == null)
                return null;

            return supplier;
        }

        public async Task<bool> VerifyUniqueCNPJ(string Cnpj)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(x => x.CNPJ == Cnpj);

            if (supplier != null)
                return false;

            return true;
        }

        public async Task<SupplierModel?> CreateSupplier(SupplierModel supplier)
        {
            if (await VerifyUniqueCNPJ(supplier.CNPJ))
            {
                supplier.CreatedAt = DateTime.Today;
                supplier.GenerateQRCode();

                _context.Suppliers.Add(supplier);
                await _context.SaveChangesAsync();
                return supplier;
            }

            return null;            
        }        
    }
}
