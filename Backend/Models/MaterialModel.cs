namespace ProcessoVega.Models
{
    public class MaterialModel
    {
        public int Id { get; set; }
        public int SupplierId { get; set; }
        public SupplierModel? Supplier { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string FiscalCode { get; set; }
        public required string Specie { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = string.Empty;
    }
}
