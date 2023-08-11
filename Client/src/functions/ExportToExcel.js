import React from 'react';


function ExcelGenerator() {
  const data = [
    ["Name", "Age"],
    ["John Doe", 30],
    ["Jane Smith", 25],
  ];

  return (
    <ExcelFile element={<button>Export to Excel</button>}>
      <ExcelSheet data={data} name="Sheet 1">
        <ExcelColumn label="Name" value="0" />
        <ExcelColumn label="Age" value="1" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ExcelGenerator;