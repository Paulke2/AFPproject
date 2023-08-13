const docx = require("docx");
const { Document, Packer, Paragraph, Table, TableCell, TableRow } = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);
  
    const NestedTable = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Nested")],
            }),
            new TableCell({
              children: [new Paragraph("row")],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Nested")],
            }),
            new TableCell({
              children: [new Paragraph("Row")],
            }),
          ],
        }),
      ],
    });
  
    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("Hello22")],
            }),
            new TableCell({
              children: [], // You can add content here if needed
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [NestedTable], // Add the NestedTable as a cell content
            }),
          ],
        }),
      ],
    });
  
    const doc = new Document({
      sections: [
        {
          children: [table],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };
  
  export default ExportToWord;