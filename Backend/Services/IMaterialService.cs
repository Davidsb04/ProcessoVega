using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public interface IMaterialService
    {
        public Task<IEnumerable<MaterialModel>> MaterialsToList();
        public Task<MaterialModel?> GetMaterialById(int materialId);
        public Task<MaterialModel?> CreateMaterial(MaterialModel material);
        public Task<String> UpdateMaterial(MaterialModel material);
    }
}
