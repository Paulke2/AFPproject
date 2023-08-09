import { Paragraph, Document, Packer, TableRow, TableCell, Table } from "docx";
import { saveAs } from "file-saver";

const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);
    

    const doc = new Document({
        sections: [
            {
                children: [
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: { size: 100 / 2, type: "dxa" }, // Set width in twips (dxa)
                                        children: [new Paragraph("Row 1 Cell 1")],
                                    }),
                                    new TableCell({
                                        width: { size: 100, type: "dxa" }, // Set width in twips (dxa)
                                        children: [new Paragraph("Row 1 Cell 2")],
                                    }),
                                ],
                            }),
                           
                            // ... (similarly for other rows)
                        ],
                    })
                ],
            },
        ],
    });
    doc.addSection({
        children: [
            new TableRow({
                width: {
                    size: 50, // Change this value as needed
                    type: "dxa",
                },
                children: [
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [new Paragraph("New Section also added")],
                    }),
                ],
            }),
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
};

export default ExportToWord;