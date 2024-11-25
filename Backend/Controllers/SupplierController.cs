using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProcessoVega.Models;
using ProcessoVega.Services;

namespace ProcessoVega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSuppliers()
        {
            try
            {
                var suppliers = await _supplierService.SuppliersToList();

                if (!suppliers.Any())
                    return NotFound("Empty List.");

                return Ok(suppliers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error: " + ex.Message);
            }
        }     

        [HttpPost]
        public async Task<ActionResult> PostSupplier(SupplierModel supplier)
        {
            try
            {
                var registeredSupplier = await _supplierService.CreateSupplier(supplier);

                if (registeredSupplier == null)
                    return BadRequest("This CNPJ has already been registered.");

                return StatusCode(201, "Supplier created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error: " + ex.Message);
            }
        }
    }
}
