using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public interface ISupplierService
    {
        public Task<IEnumerable<SupplierModel>> SuppliersToList();
        public Task<SupplierModel?> CreateSupplier(SupplierModel supplier);
    }
}
