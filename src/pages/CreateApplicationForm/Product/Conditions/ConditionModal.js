import React, { useState, useEffect } from "react";
import InputField from "../../../../components/InputField/InputField";
import AutoCompleField from "../../../../components/AutoCompleteField/AutoCompleteField";
import DateField from "../../../../components/DateField/Datefield";
import CustomButton from "../../../../components/Button/CustomButton";
import "../../Styles/Modal.css";

const ConditionModal = ({ rowDetails, onClose, onSave }) => {
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



  return (
    <div className="productStep">
      <div className="topBox">
        <AutoCompleField
          className="w-1/3"
          name="type"
          label="Type"
          labelType="left"
          dropdown
        />
        <InputField
          className="w-1/3"
          name="Code"
          label="Code"
          labelType="left"
        />

        <InputField
          className="w-1/3"
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
      </div>

      <div className="topBox">
        <div className="defaultCheckbox">
          <label>Default</label>
          <input type="checkbox" className="checkboxPopup" />
        </div>

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
    </div>
  );
};

export default ConditionModal;
