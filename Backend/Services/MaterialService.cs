using Microsoft.EntityFrameworkCore;
using ProcessoVega.Data;
using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly Context _context;

        public MaterialService(Context context)
        {
            _context = context;
        }       

        public async Task<IEnumerable<MaterialModel>> MaterialsToList()
        {
            return await _context.Materials.ToListAsync();
        }

        public async Task<bool> SupplierExist(int supplierId)
        {
            if (await _context.Suppliers.AnyAsync(x => x.Id == supplierId))
                return true;

            return false;
        }

        public async Task<MaterialModel?> CreateMaterial(MaterialModel material)
        {
            if(await SupplierExist(material.SupplierId))
            {
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
            if (!await SupplierExist(material.SupplierId))
                return "SupplierNotFound";

            var existingMaterial = await _context.Materials.FirstOrDefaultAsync(x => x.Id == material.Id);

            if (existingMaterial == null)
                return "MaterialNotFound";

            existingMaterial.SupplierId = material.SupplierId;
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
