import React from "react";
import XLSX from "xlsx";

const ExportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const excelUrl = URL.createObjectURL(excelBlob);

    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "data.xlsx";
    link.click();

    URL.revokeObjectURL(excelUrl);
};


export default ExportToExcel;