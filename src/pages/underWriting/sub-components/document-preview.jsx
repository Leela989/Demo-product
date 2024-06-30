import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

const DocumentPreview = () => {
  const [gen, setGen] = useState(false);
  const [documentPrintData, setDocumentPrintData] = useState([
    { document: "Quotation Schedule", generate: false },
    { document: "Policy Schedule", generate: false },
    { document: "FAC Offer Slip", generate: false },
    { document: "Credit Note", generate: false },
    { document: "Debit Note", generate: false },
  ]);
  const handleGenerate = (event, data) => {
    let tempPrintData = documentPrintData;
    tempPrintData.map((value) => {
      if (value.document === data.document) {
        value.generate = event.checked;
      }
    });
    setDocumentPrintData([...tempPrintData]);
  };
  const generateDoc = () => {
    let showButton = Boolean(documentPrintData.find((data) => data.generate));
    return showButton;
  };
  return (
    <>
      <div className="mt-5 pt-3">
        <div className="flex align-center flex-wrap">
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Quotes Number :
            </label>
            <p className="font-medium">Q/10/1001/2024/0545</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Ploicy Number :
            </label>
            <p className="font-medium">Q/10/1001/2024/0545</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy From Date :
            </label>
            <p className="font-medium">10/01/2024</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy To Date :
            </label>
            <p className="font-medium">10/02/2024</p>
          </div>
        </div>
        <Card className="mt-5">
          <div className={generateDoc() && "mb-4"}>
            {documentPrintData.map((data) => (
              <div className="flex align-center py-3">
                <p className="w-1/6">{data.document}</p>
                <Checkbox
                  className="mx-4"
                  onChange={(e) => handleGenerate(e, data)}
                  checked={data.generate}
                />
                <p className="mx-4">View</p>
                <a className="mx-4 block" href="mailto:sample@gmail.com">
                  Mail
                </a>
                <a className="mx-4 block" href="#">
                  Print
                </a>
              </div>
            ))}
          </div>
          {generateDoc() && (
            <div
              className={`flex flex-col ${
                gen && "items-center justify-center"
              }`}
            >
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    setGen(true);
                  }}
                  label="Generate Documents"
                />
              </div>
              {gen && (
                <p className="mt-4">
                  Selected Documents are Generated Successfully !!!
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default DocumentPreview;
