using ProcessoVega.Models;

namespace ProcessoVega.Services
{
    public interface IMaterialService
    {
        public Task<IEnumerable<MaterialModel>> GetAllMaterials();
    }
}
