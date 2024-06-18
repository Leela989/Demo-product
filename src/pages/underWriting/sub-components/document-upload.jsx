import { FileUpload } from "primereact/fileupload";
import { documentFieldDetails } from "../../../mock-data/underwriting/quotes-documentupload";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomTable from "../../../components/CustomTable/CustomTable";
import CheckBox from "../../../components/CheckBox/CheckBox";

const DocumentUpload = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onTemplateField = (file, props) => {
    return (
      <div className="image-display">
        <img
          alt={file.name}
          role="presentation"
          src={URL.createObjectURL(file)}
          width={100}
        />
        <span
          onClick={() => onSelect({ files: [file] })}
          className="ml-2 truncate"
        >
          {file.name.split(".")[0]}
        </span>
        <span className="ml-1">{file.name.split(".")[1]}</span>
        <div className="small-btn ml-3">
          <Button
            text
            rounded
            icon="pi pi-times"
            onClick={() => props.onRemove(file)}
          />
        </div>
      </div>
    );
  };

  const onSelect = (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setPreviewVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onTemplateSelect = (e) => {
    setUploadedFiles(e.files);
  };

  const headerTemplate = (options, element) => {
    const { chooseButton } = options;
    return <div className="small-btn">{chooseButton}</div>;
  };

  const renderFields = (element) => {
    if (element.field_type === "upload") {
      return (
        <div className="upload-docs">
          <p className="mr-4 header-text w-1/3 flex items-center">
            {element.label}
            {element.required && (
              <span
                className="ml-2"
                style={{ color: "#ff0000c4", fontSize: "12px" }}
              >
                (Mandatory)
              </span>
            )}
          </p>
          <FileUpload
            // mode="basic"
            customUpload
            chooseOptions={{ label: "Upload", icon: "" }}
            onSelect={onTemplateSelect}
            itemTemplate={onTemplateField}
            headerTemplate={(e) => headerTemplate(e, element)}
            auto={false}
            accept=".pdf, .doc, .jpg, .jpeg, .png"
          />
          {/* <CheckBox /> */}
          <Dialog
            header="Image Preview"
            visible={previewVisible}
            style={{ width: "80vw" }}
            onHide={() => setPreviewVisible(false)}
          >
            <img src={previewImage} alt="Preview" style={{ width: "100%" }} />
          </Dialog>
        </div>
      );
    }
  };
  return (
    <>
      <div className="flex align-center pt-5">
        <div className="w-1/3 p-1 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Quotes Number :
          </label>
          <p className="font-medium">Q/10/1001/2024/0545</p>
        </div>
        <div className="w-1/3 p-1 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy From Date :
          </label>
          <p className="font-medium">10/01/2024</p>
        </div>
        <div className="w-1/3 p-1 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy To Date :
          </label>
          <p className="font-medium">10/02/2024</p>
        </div>
      </div>
      <div className="mt-5 pt-5">
        {documentFieldDetails.map((element) => (
          <div>{renderFields(element)}</div>
        ))}
      </div>
    </>
  );
};

export default DocumentUpload;
