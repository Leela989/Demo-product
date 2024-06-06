import React, { useState, useEffect } from 'react';
import InputField from "../../../../components/InputField/InputField";
import AutoCompleField from '../../../../components/AutoCompleteField/AutoCompleteField';  
import DateField from "../../../../components/DateField/Datefield";
import CustomButton from '../../../../components/Button/CustomButton';
import '../../Styles/Modal.css';

const DLModal = ({ visible, rowDetails, onClose, onSave }) => {
  const [formData, setFormData] = useState(rowDetails);

  useEffect(() => {
    setFormData(rowDetails);
  }, [rowDetails]);

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
          <button className="close-button" onClick={onClose}>×</button>
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
            name="percentage"
            label="Percentage"
            labelType="left"
          />
          <InputField
            className="w-1/2" 
            name="value"
            label="Value"
            labelType="left"
          />
          <div className="checkboxes">
                <label>Default</label>
                <input type="checkbox" className="checkboxPopup"/>
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
        <CustomButton label={"Save"} className="custombtnsave w-[12.5%]"/>
        
      </div>
      </div>
    </div>
  );
};

export default DLModal;
