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
} = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentEmployee,currentWeekCards) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log("Current Time Card:", currentWeekCards);
  console.log(currentEmployee[0])
  console.log(currentWeekCards[currentEmployee[0]].startOfWeek)
  const PageContents = [];
  const pageHeader = new Paragraph({
    children: [
      new TextRun({
        text: "Week: ",
        bold: true,
      }),
      new TextRun({
        text: currentWeekCards[currentEmployee[0]].startOfWeek.toString(),
      }),
      new TextRun({
        text: "\t\t\t\t\t\t", // Add appropriate number of tabs for spacing
      }),
      new TextRun({
        text: "Employee Name:",
        bold: true,
        alignment: AlignmentType.RIGHT,
      }),
      new TextRun({
        text: currentEmployee.employeeName,
        alignment: AlignmentType.RIGHT,
      }),
    ],
  });
  PageContents.push(pageHeader);
  
 var startOfWeek = moment(currentWeekCards[currentEmployee[0]]?.startOfWeek); 
  daysOfWeek.map((day)=>{
  const leftCell = new TableCell({
    children: [
      new Paragraph(
        day+startOfWeek.format("l").toString()
      
      ),
    ],
    width: {
      size: 40,
      type: WidthType.PERCENTAGE,
    },
  });
  startOfWeek.add(1,"days");
  // Create rows for the nested table
  const nestedJobTitleTableRows = [];
  const JobRowHeader = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph("Job Name")], // Add content if needed,
      }),
      new TableCell({
        children: [new Paragraph("Invoice #")], // Add content if needed,
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
const JobList = currentWeekCards[currentEmployee[0]]?.[day].split(",");
 let TotalHoursCounter=0;

  for (let i = 0; i < 4; i++) {
    const nestedRow = new TableRow({
      children: [
        new TableCell({
          children: [
            JobList[i]!==undefined ?  new Paragraph(JobList[i].slice(0, -2)):
              new Paragraph(""),
          ], 
     
        }),
        new TableCell({
            children: [
                new Paragraph("")
                
            ], 
            width: {
                size: 500,
                type: WidthType.DXA,
              },
          }),
          new TableCell({
            children: [
              JobList[i] !== undefined
                ? (() => {
                    TotalHoursCounter = TotalHoursCounter + parseInt(JobList[i].slice(-1));
                    return new Paragraph(JobList[i].slice(-1));
                  })() // Invoke the function to get the returned value
                : new Paragraph(""), // Return an empty paragraph if JobList[i] is undefined
            ],
          }),
          new TableCell({
            children: [
                new Paragraph("")
            ], 
          }),
          new TableCell({
            children: [
                new Paragraph("")
            ], 
          }),
      ],
      
    });
    nestedJobTitleTableRows.push(nestedRow);
  }

  // Create the nested table with 100% width
  const nestedTable = new Table({
    rows: nestedJobTitleTableRows,
   width:{
    size:100,
    type: WidthType.PERCENTAGE,
   }
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
  PageContents.push( new Paragraph(""));
})
  // Create the document
  const doc = new Document({
    sections: [
      {
        children: PageContents,
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "test"+ ".docx");
    console.log("Document created successfully");
  });
};

export default ExportToWord;