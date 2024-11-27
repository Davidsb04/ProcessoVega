using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProcessoVega.Migrations
{
    /// <inheritdoc />
    public partial class FixColumnAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "Suppliers",
                newName: "Address");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Suppliers",
                newName: "Adress");
        }
    }
}
