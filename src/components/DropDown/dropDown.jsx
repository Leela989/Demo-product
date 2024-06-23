import { Dropdown } from "primereact/dropdown";
import { useMemo } from "react";

const selectedTemplate = (option, props) => {
  if (option) {
    return <span>{typeof option === 'object' ? option.name : option}</span>;
  }
  return <span>{props.placeholder}</span>;
};

const useRenderDropdown = (formData, opTionsDrop, handelFormValues) => {
  return useMemo(
    () => (field, party) => {
      let listData = formData === ''? party: formData;
      const fieldValue = listData[field.name];
      let selectedOption;
      if (
        Array.isArray(opTionsDrop[field.name]) &&
        typeof opTionsDrop[field.name][0] === "object"
      ) {
        const fieldLabel =
          fieldValue && fieldValue.includes("-")
            ? fieldValue.split("-")[1].trim()
            : fieldValue;
        selectedOption = opTionsDrop[field.name]?.find(
          (option) => option.name === fieldLabel
        );
      } else {
        selectedOption = opTionsDrop[field.name]?.find(
          (option) => option === fieldValue
        );
      }


      return (
        <Dropdown
          value={selectedOption}
          name={field.name}
          options={opTionsDrop[field.name]}
          onChange={(e) => handelFormValues(e, field.name)}
          optionLabel={
            typeof opTionsDrop[field.name]?.[0] === "object"
              ? "name"
              : undefined
          }
          valueTemplate={selectedTemplate}
          required={field.required}
        />
      );
    },
    [formData, opTionsDrop, handelFormValues]
  );
};

export default useRenderDropdown;
