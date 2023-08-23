import * as XLSX from 'xlsx';

const ExportToExcel = (employees, currentWeekCards,employeeObjects) => {
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


    const setOfficeWorker = ( time, name) =>{
        return( {
            "startOfWeek":"8/1/23",
            "Sunday":"",
            "Monday":"Office"+ time,
            "Tuesday":"Office"+ time,
            "Wednesday":"Office"+ time,
            "Thursday":"Office"+ time,
            "Friday":"Office"+ time,
            "Saturday":"",
            "employeeName":name,
            "totalHours":0
        
          });
    }
    const findEmployee = (target, employees) =>{
        
        for (let i = 0; i < employees.length; i++) {
            if (employeeObjects[i].employeeName === target) {
              return employeeObjects[i]
              
            }
           
          }
          return null;
        
            }
        console.log("employees");
        console.log(employeeObjects);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([[""],["","",currentWeekCards["date"]],["","NAME","Regular","OT","VAC.","HOL.","RATE JOB","RATE","OTHER"]]); // Create an empty worksheet
    
    XLSX.utils.sheet_add_json(ws, [""], { skipHeader: true, origin: -1 });
    employees.forEach((employee) => {
        // Assuming currentWeekCards[employee] is an object with key-value pairs
        const employeeData = currentWeekCards[employee];
        console.log(employee);
        console.log(findEmployee(employee,employeeObjects).officeWorker);
        // Convert employeeData object to an array of objects
        let employeeDataObject=employeeData!==null ?
        employeeData :(findEmployee(employee,employeeObjects).officeWorker===false ?  setDefault(employee) : setOfficeWorker(findEmployee(employee,employeeObjects).officeWorkerHours,employee))

       console.log(employeeDataObject)
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