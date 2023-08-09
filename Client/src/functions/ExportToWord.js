import { Paragraph, Document, Packer,TableRow ,TableCell,Table} from "docx";
import { saveAs } from "file-saver";
const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);
    const tableToAddToDocument = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Row 1 Cell 1 ")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Row 1 Cell 2 ")],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Row 2 Cell 1 ")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Row 2 Cell 2 ")],
                    }),
                ],
            }),
        ],
    });
    const doc = new Document({
      sections: [
        {
            children: [
                new Paragraph({ text: "Table with third row added to it" }),
                tableToAddToDocument,
            ],
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
