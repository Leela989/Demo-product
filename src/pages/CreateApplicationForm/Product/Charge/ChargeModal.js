import React, { useState, useEffect } from "react";
import InputField from "../../../../components/InputField/InputField";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CustomButton from "../../../../components/Button/CustomButton";
import "../../Styles/Modal.css";

const DLModal = ({ visible, rowDetails, onClose, onSave }) => {
  const [formData, setFormData] = useState(rowDetails);

  useEffect(() => {
    setFormData(rowDetails);
  }, [rowDetails]);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="productStep">
          <div className="topBox">
            <AutoCompleField
              className="w-1/4"
              name="type"
              label="Type"
              labelType="left"
              dropdown
            />
            <InputField
              className="w-1/4"
              name="Code"
              label="Code"
              labelType="left"
            />

            <InputField
              className="w-1/4"
              name="description"
              label="Description"
              labelType="left"
            />
          </div>
          <div className="topBox">
            <InputField
              className="w-1/2"
              name="shortDescription"
              label="Short Description"
              labelType="left"
            />
            <InputField
              className="w-1/2"
              name="longDescription"
              label="Long Description"
              labelType="left"
            />
            <div className="checkboxes">
              <label htmlFor="mandatoryCheckbox">Default</label>
              <input
                type="checkbox"
                className="checkboxPopup"
                id="mandatoryCheckbox"
              />
            </div>
          </div>

          <div className="topcheckBox">
            <div className="checkboxes">
              <input
                type="checkbox"
                className="checkboxPopup"
                id="mandatoryCheckbox"
              />
              <label htmlFor="mandatoryCheckbox">Mandatory yes/No</label>
            </div>
            <div className="checkboxes">
              <input
                type="checkbox"
                className="checkboxPopup"
                id="allowModificationsCheckbox"
              />
              <label htmlFor="allowModificationsCheckbox">
                Allow Modifications
              </label>
            </div>
            <div className="checkboxes">
              <input
                type="checkbox"
                className="checkboxPopup"
                id="refundCheckbox"
              />
              <label htmlFor="refundCheckbox">Refund yes/No</label>
            </div>
          </div>

          <div className="topBox">
            <DateField
              className="w-1/2"
              name="effectiveFrom"
              label="Effective From"
              labelType="float"
            />
            <DateField
              className="w-1/2"
              name="effectiveTo"
              label="Effective To"
              labelType="float"
            />
          </div>
          <CustomButton label={"Save"} className="custombtnsave w-[12.5%]" />
        </div>
      </div>
    </div>
  );
};

export default DLModal;
