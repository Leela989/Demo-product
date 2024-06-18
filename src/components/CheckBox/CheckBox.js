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
  disabled,
  labelPosition = "left",
}) => {
  const [checked, setChecked] = useState(boxChecked);

  const handleInputChange = (event) => {
    setChecked(event.checked);
    if (onChange) {
      onChange(name, event.checked);
    }
  };

  return (
    <div className="checkbox-container">
      {labelName && labelPosition === "left" && (
        <label className="left-label label" htmlFor={checkBoxId}>
          {labelName}
        </label>
      )}
      <Checkbox
        id={checkBoxId} // Corrected the attribute for id
        name={name}
        onChange={handleInputChange}
        checked={checked}
        className="checkBox"
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
