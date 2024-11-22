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

        public async Task<IEnumerable<MaterialModel>> GetAllMaterials()
        {
            return await _context.Materials.ToListAsync();
        }
    }
}
