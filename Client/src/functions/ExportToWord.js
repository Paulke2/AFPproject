import { Paragraph, Document, Packer } from "docx";
import { saveAs } from "file-saver";
const ExportToWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "text",
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

//   return (
//     <div className="App">
//       <button onClick={ExportToWord}>Generate doc</button>
//     </div>
//   );
};
export default ExportToWord;
