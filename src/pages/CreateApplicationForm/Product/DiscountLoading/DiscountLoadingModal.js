import React, { useState, useEffect } from "react";
import InputField from "../../../../components/InputField/InputField";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import "../../Styles/Modal.css";

const DiscountLoadingModal = ({ rowDetails, onSave }) => {
  const [formData, setFormData] = useState(rowDetails || {});

  useEffect(() => {
    setFormData(rowDetails || {});
  }, [rowDetails]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const list = [
    { name: "10 Motor" },
    { name: "20 Fire" },
    { name: "30 Marine" },
    { name: "40 Engineering" },
    { name: "50 Miscellaneous and Accident" },
    { name: "60 Liability" },
    { name: "70 Bonds" },
    { name: "80 Aviation" },
    { name: "90 Package" },
    { name: "91 Agriculture" },
  ];

  return (
    <div>
      <div className="productStep">
        <div className="topBox">
          <AutoCompleField
            className="w-1/3"
            name="type"
            label="Type"
            labelType="left"
            options={list}
            dropdown
            onChange={(e) => handleInputChange("type", e.target.value)}
          />
          <InputField
            className="w-1/3"
            name="Code"
            label="Code"
            labelType="left"
            onChange={(e) => handleInputChange("Code", e.target.value)}
          />
          <InputField
            className="w-1/3"
            name="description"
            label="Description"
            labelType="left"
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
        <div className="topBox">
          <InputField
            className="w-1/2"
            name="shortDescription"
            label="Short Description"
            labelType="left"
            onChange={(e) => handleInputChange("shortDescription", e.target.value)}
          />
          <InputField
            className="w-1/2"
            name="longDescription"
            label="Long Description"
            labelType="left"
            onChange={(e) => handleInputChange("longDescription", e.target.value)}
          />
        </div>
        <div className="topcheckBox">
          <div className="checkboxes">
            <label>Mandatory</label>
            <input
              type="checkbox"
              className="checkboxPopup"
              onChange={(e) => handleInputChange("mandatory", e.target.checked)}
            />
          </div>
          <div className="checkboxes">
            <label>Allow Modifications</label>
            <input
              type="checkbox"
              className="checkboxPopup"
              onChange={(e) =>
                handleInputChange("allowModifications", e.target.checked)
              }
            />
          </div>
          <div className="checkboxes">
            <label>Refund yes/No</label>
            <input
              type="checkbox"
              className="checkboxPopup"
              onChange={(e) => handleInputChange("refund", e.target.checked)}
            />
          </div>
        </div>
        <div className="topBox">
          <DateField
            className="w-1/2"
            name="effectiveFrom"
            label="Effective From"
            labelType="float"
            onChange={(e) => handleInputChange("effectiveFrom", e.target.value)}
          />
          <DateField
            className="w-1/2"
            name="effectiveTo"
            label="Effective To"
            labelType="float"
            onChange={(e) => handleInputChange("effectiveTo", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountLoadingModal;
