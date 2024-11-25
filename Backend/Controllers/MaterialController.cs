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
                var materials = await _materialService.MaterialsToList();

                if (!materials.Any())
                    return NotFound("Empty List.");

                return Ok(materials);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateMaterial(MaterialModel material)
        {
            try
            {
                var registeredMaterial = await _materialService.CreateMaterial(material);

                if (registeredMaterial == null)
                    return NotFound("This supplier is not registered in the system.");

                return StatusCode(201, "Material created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMaterial(MaterialModel material)
        {
            try
            {
                string updatedMaterial = await _materialService.UpdateMaterial(material);

                if (updatedMaterial == "SupplierNotFound")
                    return NotFound("This supplier is not registered in the system.");

                if (updatedMaterial == "MaterialNotFound")
                    return NotFound("This mateiral is not registered in the system.");

                return StatusCode(201, "Material updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error: " + ex.Message);
            }
        }
    }
}
