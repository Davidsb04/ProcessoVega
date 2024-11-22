using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProcessoVega.Models;
using ProcessoVega.Services;

namespace ProcessoVega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;

        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllMaterials()
        {
            try
            {
                var materials = await _materialService.GetAllMaterials();

                if (materials == null)
                    return NotFound("Lista vazia.");

                return Ok(materials);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro do servidor: " + ex.Message);
            }
        }
    }
}
