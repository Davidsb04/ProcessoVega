using Microsoft.EntityFrameworkCore;
using ProcessoVega.Data;
using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly Context _context;
        private readonly ISupplierService _supplierService;

        public MaterialService(Context context, ISupplierService supplierService)
        {
            _context = context;
            _supplierService = supplierService;
        }       

        public async Task<IEnumerable<MaterialModel>> MaterialsToList()
        {
            List<MaterialModel> materials = await _context.Materials.ToListAsync();

            foreach (var material in materials)
            {
                var supplier = await _supplierService.GetSupplierById(material.SupplierId);
                material.Supplier = supplier;
            }

            return materials;
        }

        public async Task<MaterialModel?> GetMaterialById(int materialId)
        {
            var material = await _context.Materials
                .Include(m => m.Supplier)
                .SingleOrDefaultAsync(x => x.Id == materialId);

            if (material == null)
                return null;

            return material;
        }

        public async Task<MaterialModel?> CreateMaterial(MaterialModel material)
        {
            var supplier = await _supplierService.GetSupplierById(material.SupplierId);

            if(supplier != null)
            {
                material.Supplier = supplier;
                material.CreatedAt = DateTime.Today;
                material.UpdatedAt = null;

                _context.Materials.Add(material);
                await _context.SaveChangesAsync();

                return material;
            }

            return null;
        }

        public async Task<String> UpdateMaterial(MaterialModel material)
        {
            var supplier = await _supplierService.GetSupplierById(material.SupplierId);

            if (supplier == null)
                return "SupplierNotFound";

            var existingMaterial = await _context.Materials.FirstOrDefaultAsync(x => x.Id == material.Id);

            if (existingMaterial == null)
                return "MaterialNotFound";

            existingMaterial.SupplierId = material.SupplierId;
            existingMaterial.Supplier = supplier;
            existingMaterial.Code = material.Code;
            existingMaterial.Name = material.Name;
            existingMaterial.Description = material.Description;
            existingMaterial.FiscalCode = material.FiscalCode;
            existingMaterial.Specie = material.Specie;
            existingMaterial.UpdatedAt = DateTime.Today;
            existingMaterial.UpdatedBy = material.UpdatedBy;

            await _context.SaveChangesAsync();

            return "MateiralUpdated";
        }
    }
}
