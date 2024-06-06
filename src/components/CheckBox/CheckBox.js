import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import "./CheckBox.css";

const CheckBox = ({
  onChange,
  name,
  labelName = "left",
  checkBoxId,
  varient,
  labelPosition,
}) => {
  const [checked, setChecked] = useState(false);

  const handleInputChange = (event) => {
    setChecked(event.checked);
    // onChange(name,event.checked);
  };

  return (
    <div className="card flex justify-center items-center checkbox-container">
      {labelName && labelPosition === "left" ? (
        <label className="left-label" htmlFor={checkBoxId}>
          {labelName}
        </label>
      ) : null}
      <Checkbox
        checkBoxId={checkBoxId}
        name={name}
        onChange={handleInputChange}
        checked={checked}
        className="checkBox"
      />
      {labelName && labelPosition === "right" ? (
        <label className="right-label" htmlFor={checkBoxId}>
          {labelName}
        </label>
      ) : null}
    </div>
  );
};

export default CheckBox;
