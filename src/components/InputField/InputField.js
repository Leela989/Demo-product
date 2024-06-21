import "./InputField.css";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import mandatoryImg from "../../assets/star-red-512.webp";
import { Tooltip } from 'primereact/tooltip';
        

const InputField = ({
  label,
  type,
  name,
  value,
  invalid,
  disabled,
  className,
  locale,
  currency,
  labelType,
  onChange,
  mandatory = false,
  tooltip,
}) => {
  const [fieldValue, setFieldValue] = useState(value);
  const handleChange = (event) => {
    let _value;
    if (type === "number") {
      _value = event.value;
    } else {
      _value = event.target.value;
    }
    setFieldValue(_value);
    onChange(name, _value);
  };

  const fields = () => {
    return (
      <>
    <Tooltip target=".p-inputtext.p-disabled"/>
        {type === "number" ? (
          <InputNumber
            value={fieldValue}
            disabled={disabled}
            invalid={invalid}
            currency={currency}
            locale={locale}
            onChange={handleChange}
            tooltip={tooltip}
            tooltipOptions={{ position: 'bottom' }}
          />
        ) : (
          <InputText
            value={fieldValue}
            disabled={disabled}
            invalid={invalid}
            onChange={handleChange}
            tooltip={tooltip}
            tooltipOptions={{ position: 'bottom' }}
          />
        )}
      </>
    );
  };

  let styleClass = labelType === "left" ? "left-label" : "top-label";

  return (
    <div className={`input-field  ${className}`}>
      {labelType === "float" ? (
        <span className="p-float-label">
          {fields()}
          <label htmlFor={name}>{label}</label>
          <img src={mandatory} alt="imageTag" width="10px" />
        </span>
      ) : (
        <div className={styleClass}>
          <label htmlFor={name}>
            {label}{" "}
            {mandatory && <span className="text-red-600 text-xl">*</span>}
          </label>
          {fields()}
        </div>
      )}
    </div>
  );
};

export default InputField;
