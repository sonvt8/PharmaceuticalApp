using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class AddSubjectIntoFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "FeedBacks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Subject",
                table: "FeedBacks");
        }
    }
}
