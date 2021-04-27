using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class editjob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAvailable",
                table: "Jobs",
                newName: "IsAvailable");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAvailable",
                table: "Jobs",
                newName: "isAvailable");
        }
    }
}
