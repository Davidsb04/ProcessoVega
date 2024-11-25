using Microsoft.EntityFrameworkCore;

namespace ProcessoVega.Models
{
    public class SupplierModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string CNPJ { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Adress { get; set; }
        public int CEP { get; set; }
        public required string QRCode { get; set; }

        public void GenerateQRCode()
        {
            QRCode = $"%{CNPJ}% - %{CEP}% / CAD.%{CreatedAt}%";
        }
    }
}
