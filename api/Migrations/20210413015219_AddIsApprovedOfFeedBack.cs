using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class AddIsApprovedOfFeedBack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "FeedBacks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "FeedBacks");
        }
    }
}
