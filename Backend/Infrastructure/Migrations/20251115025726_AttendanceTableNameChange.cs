using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AttendanceTableNameChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonthlyAttendanceSummaries_Employees_EmployeeId",
                table: "MonthlyAttendanceSummaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MonthlyAttendanceSummaries",
                table: "MonthlyAttendanceSummaries");

            migrationBuilder.RenameTable(
                name: "MonthlyAttendanceSummaries",
                newName: "AttendanceMonthlySummaries");

            migrationBuilder.RenameIndex(
                name: "IX_MonthlyAttendanceSummaries_EmployeeId",
                table: "AttendanceMonthlySummaries",
                newName: "IX_AttendanceMonthlySummaries_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AttendanceMonthlySummaries",
                table: "AttendanceMonthlySummaries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceMonthlySummaries_Employees_EmployeeId",
                table: "AttendanceMonthlySummaries",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendanceMonthlySummaries_Employees_EmployeeId",
                table: "AttendanceMonthlySummaries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AttendanceMonthlySummaries",
                table: "AttendanceMonthlySummaries");

            migrationBuilder.RenameTable(
                name: "AttendanceMonthlySummaries",
                newName: "MonthlyAttendanceSummaries");

            migrationBuilder.RenameIndex(
                name: "IX_AttendanceMonthlySummaries_EmployeeId",
                table: "MonthlyAttendanceSummaries",
                newName: "IX_MonthlyAttendanceSummaries_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MonthlyAttendanceSummaries",
                table: "MonthlyAttendanceSummaries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MonthlyAttendanceSummaries_Employees_EmployeeId",
                table: "MonthlyAttendanceSummaries",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
