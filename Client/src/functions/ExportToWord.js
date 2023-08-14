const docx = require('docx');
const { Document, AlignmentType,Packer, Paragraph, Table, Header,TableCell, TableRow,TextRun,WidthType} = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentTimeCard) => {
    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

    console.log("Current Time Card:", currentTimeCard);

    const pageHeader = new Paragraph({
        children: [
            new TextRun({
                text: "Week: ",
                bold: true,
            }),
            new TextRun({
                text: currentTimeCard.startOfWeek.toString(),
                
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
                text: currentTimeCard.employeeName,
                alignment: AlignmentType.RIGHT,
            }),
        ],
    });
    const leftCell = new TableCell(
        {
        children: [new Paragraph(daysOfWeek[0]+": "+currentTimeCard.startOfWeek.toString())],
        width: {
            size: 30,
            type: WidthType.PERCENTAGE,
        }
    });
    
    // Create rows for the nested table
    const nestedTableRows = [];
    const JobRowHeader = new TableRow({
        children: [
            new TableCell({
                children: [new Paragraph("Job Name")] // Add content if needed,
                
            })
        ],width: {
            size: 30,
            type: WidthType.PERCENTAGE,
        }
    });
    nestedTableRows.push(JobRowHeader);
    for (let i = 0; i < 3; i++) {
        const nestedRow = new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph(`Nested Row ${i + 1}`)] // Add content if needed,
                    
                })
            ],width: {
                size: 30,
                type: WidthType.PERCENTAGE,
            }
        });
        nestedTableRows.push(nestedRow);
    }
    
    // Create the nested table with 100% width
    const nestedTable = new Table({
        rows: nestedTableRows,
        width: {
            size: 100,
            type: docx.WidthType.PERCENTAGE
        }
    });
    
    // Create the right cell of the main table and add the nested table
    const rightCell = new TableCell({
        children: [nestedTable]
    });
    
    // Create the main table
    const mainTable = new Table({
        rows: [
            new TableRow({
                children: [leftCell, rightCell]
            })
        ],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        }
    });
    
    // Create the document
    const doc = new Document({
        sections: [
            {
                children: [pageHeader,mainTable]
            }
        ]
    });
    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, currentTimeCard.startOfWeek.toString()+".docx");
        console.log("Document created successfully");
    });
};

export default ExportToWord;