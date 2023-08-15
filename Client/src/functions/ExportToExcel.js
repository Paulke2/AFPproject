import * as XLSX from 'xlsx';

const ExportToExcel = (employees, currentWeekCards) => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    const setDefault = (name)=>{
        return( {
            "startOfWeek":"8/1/23",
            "Sunday":"",
            "Monday":"",
            "Tuesday":"",
            "Wednesday":"",
            "Thursday":"",
            "Friday":"",
            "Saturday":"",
            "employeeName":name,
            "totalHours":0
        
          });
        }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([[""],["","",currentWeekCards["date"]],["","NAME","Regular","OT","VAC.","HOL.","RATE JOB","RATE","OTHER"]]); // Create an empty worksheet
    
    XLSX.utils.sheet_add_json(ws, [""], { skipHeader: true, origin: -1 });
    employees.forEach((employee) => {
        // Assuming currentWeekCards[employee] is an object with key-value pairs
        const employeeData = currentWeekCards[employee];
        console.log(currentWeekCards[employee]);
        console.log(employeeData);
        // Convert employeeData object to an array of objects
        let employeeDataObject=employeeData!==null ?
        employeeData:setDefault(employee)

       
        const employeeDataArray = [];

        daysOfWeek.forEach((day) => {
            if (employeeDataObject[day] !== "") {
                employeeDataArray.push(["", employeeDataObject[day].slice(0, -2), employeeDataObject[day].slice(-1)]);
            }
        });
        employeeDataArray.push(["", employeeDataObject.employeeName]);
        employeeDataArray.push([""]);
        // Push the data of the current employee to the worksheet
        XLSX.utils.sheet_add_json(ws, employeeDataArray, { skipHeader: true, origin: -1 });
    });

    XLSX.utils.book_append_sheet(wb, ws, 'AllEmployees'); // Append the worksheet to the workbook

    XLSX.writeFile(wb, 'employees.xlsx');
}

export default ExportToExcel;