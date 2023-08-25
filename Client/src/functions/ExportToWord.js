const docx = require("docx");
import moment from "moment";
const {
  Document,
  AlignmentType,
  Packer,
  Paragraph,
  Table,
  Header,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  PageBreak,
} = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentEmployee, currentWeekCards, employeeObjects) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const setDefault = (name) => {
    return {
      startOfWeek: currentWeekCards.date,
      Sunday: "",
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      employeeName: name,
      totalHours: 0,
    };
  };
  const setOfficeWorker = (time, name) => {
    return {
      startOfWeek:  currentWeekCards.date,
      Sunday: "",
      Monday: "Office-REG" + time,
      Tuesday: "Office-REG" + time,
      Wednesday: "Office-REG" + time,
      Thursday: "Office-REG" + time,
      Friday: "Office-REG" + time,
      Saturday: "",
      employeeName: name,
      totalHours: time*5,
    };
  };
  const findEmployee = (target, employees) => {
    for (let i = 0; i < employees.length; i++) {
      if (employeeObjects[i].employeeName === target) {
        return employeeObjects[i];
      }
    }
    return null;
  };
  console.log("Current Time Card:", currentWeekCards);

  const PageContents = [];
  currentEmployee.map((employee) => {
    let TotalHoursForWeekCounter = 0;
    let card =
      currentWeekCards[employee] === null
        ? findEmployee(employee, employeeObjects).officeWorker
          ? setOfficeWorker(
              findEmployee(employee, employeeObjects).officeWorkerHours,
              employee
            )
          : setDefault(employee)
        : currentWeekCards[employee];

    const pageHeader = new Paragraph({
      children: [
        new TextRun({
          text: "Week: ",
          bold: true,
        }),
        new TextRun({
          text: card.startOfWeek.toString(),
        }),
        new TextRun({
          text: "\t\t\t\t\t\t", // Add appropriate number of tabs for spacing
        }),
        new TextRun({
          text: "Employee Name: ",
          bold: true,
          alignment: AlignmentType.RIGHT,
        }),
        new TextRun({
          text: employee,
          alignment: AlignmentType.RIGHT,
        }),
      ],
    });
    PageContents.push(pageHeader);
    let totalHoursForWeek;
    var startOfWeek = moment(card?.startOfWeek);
    daysOfWeek.map((day) => {
      const leftCell = new TableCell({
        children: [new Paragraph(day + ":\n" + startOfWeek.format("l").toString())],
        width: {
          size: 5, // Set a fixed width of 2 inches (adjust the value as needed)
          type: WidthType.DXA, // Use DXA (twentieths of a point) to specify inches
        },
      });
      startOfWeek.add(1, "days");
      // Create rows for the nested table
      const nestedJobTitleTableRows = [];
      const JobRowHeader = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph("Job Name")], // Add content if needed,
          
           
          }),
          new TableCell({
            children: [new Paragraph("Invoice #")], // Add content if needed
          }),
          new TableCell({
            children: [new Paragraph("Reg")], // Add content if needed,
          }),
          new TableCell({
            children: [new Paragraph("OT")], // Add content if needed,
          }),
          new TableCell({
            children: [new Paragraph("Total")], // Add content if needed,
          }),
        ],
        width: {
          size: 30,
          type: WidthType.PERCENTAGE,
        },
      });
      nestedJobTitleTableRows.push(JobRowHeader);
      const JobList = card?.[day].split(",");
      let TotalHoursCounter = 0;
      //first cell job name, second is invoice(blank), 3rd is reg hours, 4th OT, 5th is total
      for (let i = 0; i < 4; i++) {
        let index = JobList[i]?.lastIndexOf("-");
        const nestedRow = new TableRow({
          children: [
            new TableCell({
              children: [
                JobList[i] !== undefined
                  ? new Paragraph(JobList[i].slice(0, index))
                  : new Paragraph(""),
              ],
            }),
            new TableCell({
              children: [new Paragraph("")],
              width: {
                size: 500,
                type: WidthType.DXA,
              },
            }),
            new TableCell({
              children: [
                JobList[i] !== undefined && index !== -1
                  ? JobList[i]?.substring(index + 1, index + 4) === "REG"
                    ? (() => {
                        TotalHoursCounter =
                          TotalHoursCounter +
                          parseInt(JobList[i].substring(index + 4));
                        return new Paragraph(JobList[i].substring(index + 4));
                      })()
                    : new Paragraph("") // Return an empty paragraph if the condition is not met
                  : new Paragraph("") // Return an empty paragraph if JobList[i] is undefined or index is -1
              ],
            }),
            new TableCell({
              children: [
                JobList[i] !== undefined && index !== -1
                  ? JobList[i]?.substring(index + 1, index + 4) === "OTT"
                    ? (() => {
                        TotalHoursCounter =
                          TotalHoursCounter +
                          parseInt(JobList[i].substring(index + 4));
                        return new Paragraph(JobList[i].substring(index + 4));
                      })()
                    : new Paragraph("") // Return an empty paragraph if the condition is not met
                  : new Paragraph("") // Return an empty paragraph if JobList[i] is undefined or index is -1
              ],
            }),
            new TableCell({
              children: [
                i === 3 && day !== "Saturday"
                  ? new Paragraph(TotalHoursCounter.toString())
                  : day === "Saturday"&& i ===3
                  ? new Paragraph("TOTAL: "+(TotalHoursForWeekCounter+TotalHoursCounter).toString())
                  : new Paragraph(""),
              ],
            }),
          ],
        });
        nestedJobTitleTableRows.push(nestedRow);

      }
      TotalHoursForWeekCounter=TotalHoursForWeekCounter+TotalHoursCounter;

      // Create the nested table with 100% width
      const nestedTable = new Table({
        rows: nestedJobTitleTableRows,
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
      });

      //   const nestedRegHoursRows = [];

      //   const nestedOverTimeHoursRows = [];

      //   const nestedTotalHoursRows = [];

      // Create the right cell of the main table and add the nested table
      const rightCell = new TableCell({
        children: [nestedTable],
      });

      // Create the main table
      const mainTable = new Table({
        rows: [
          new TableRow({
            children: [leftCell, rightCell],
          }),
        ],
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
      });
      PageContents.push(mainTable);
      PageContents.push(new Paragraph(""));
    });
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
    PageContents.push(new Paragraph(""));
  });
  // Create the document
  const doc = new Document({
    sections: [
      {
        children: PageContents,
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "test" + ".docx");
    console.log("Document created successfully");
  });
};

export default ExportToWord;
