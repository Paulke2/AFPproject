import { Paragraph, Document, Packer } from "docx";
import { saveAs } from "file-saver";
const ExportToWord = (currentTimeCard) => {
    console.log("Current Time Card:", currentTimeCard);
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "test",
              bullet: {
                level: 0 //How deep you want the bullet to be
              }
            }),
            new Paragraph({
              text: "testing",
              bullet: {
                level: 0
              }
            })
          ]
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
