const docx = require('docx');
const { Document, Packer, Paragraph, Table, TableCell, TableRow } = docx;
import { saveAs } from "file-saver";

const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);

    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Hello")],
                    }),
                    new TableCell({
                        children: [],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [new Paragraph("World")],
                    }),
                ],
            }),
        ],
    });
    
    const doc = new Document({
        sections: [{
            children: [table],
        }],
    });

    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
};

export default ExportToWord;