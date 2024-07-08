import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import "./CheckBox.css";

const CheckBox = ({
  onChange,
  name,
  labelName = "",
  checkBoxId,
  boxChecked = false,
  varient,
  labelPosition = "left",
  // checked,
  disabled=false
}) => {
  const handleInputChange = (event) => {
    if (onChange) {
      onChange(name, event.checked);
    }
  };
  const [checked, setChecked] = useState(false);

  return (
    <div className="checkbox-container">
      {labelName && labelPosition === "left" && (
        <label className="left-label label" htmlFor={checkBoxId}>
          {labelName}
        </label>
      )}
      <Checkbox
        id={checkBoxId}
        name={name}
        onChange={handleInputChange}
        checked={checked}
        className="checkBox"
        onChange={e => setChecked(e.checked)} 
        disabled={disabled}
      />
      {labelName && labelPosition === "right" && (
        <label className="right-label label" htmlFor={checkBoxId}>
          {labelName}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
