const docx = require('docx');
const { Document, Packer, Paragraph, Table, TableCell, TableRow,WidthType} = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);
    const leftCell = new TableCell({
        children: [new Paragraph("Left Cell Content")]
    });
    
    // Create rows for the nested table
    const nestedTableRows = [];
    for (let i = 0; i < 4; i++) {
        const nestedRow = new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph(`Nested Row ${i + 1}`)] // Add content if needed
                })
            ]
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
                children: [mainTable]
            }
        ]
    });
    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
};

export default ExportToWord;