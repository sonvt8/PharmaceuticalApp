using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class dbsetCandidate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidate_AspNetUsers_AppUserId",
                table: "Candidate");

            migrationBuilder.DropForeignKey(
                name: "FK_Candidate_Jobs_JobId",
                table: "Candidate");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Candidate_CandidateId",
                table: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Candidate",
                table: "Candidate");

            migrationBuilder.RenameTable(
                name: "Candidate",
                newName: "Candidates");

            migrationBuilder.RenameIndex(
                name: "IX_Candidate_JobId",
                table: "Candidates",
                newName: "IX_Candidates_JobId");

            migrationBuilder.RenameIndex(
                name: "IX_Candidate_AppUserId",
                table: "Candidates",
                newName: "IX_Candidates_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Candidates",
                table: "Candidates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_AspNetUsers_AppUserId",
                table: "Candidates",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_Jobs_JobId",
                table: "Candidates",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Candidates_CandidateId",
                table: "Photos",
                column: "CandidateId",
                principalTable: "Candidates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_AspNetUsers_AppUserId",
                table: "Candidates");

            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_Jobs_JobId",
                table: "Candidates");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Candidates_CandidateId",
                table: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Candidates",
                table: "Candidates");

            migrationBuilder.RenameTable(
                name: "Candidates",
                newName: "Candidate");

            migrationBuilder.RenameIndex(
                name: "IX_Candidates_JobId",
                table: "Candidate",
                newName: "IX_Candidate_JobId");

            migrationBuilder.RenameIndex(
                name: "IX_Candidates_AppUserId",
                table: "Candidate",
                newName: "IX_Candidate_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Candidate",
                table: "Candidate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidate_AspNetUsers_AppUserId",
                table: "Candidate",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Candidate_Jobs_JobId",
                table: "Candidate",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Candidate_CandidateId",
                table: "Photos",
                column: "CandidateId",
                principalTable: "Candidate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
