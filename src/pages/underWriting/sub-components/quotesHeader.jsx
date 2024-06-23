import { InputText } from "primereact/inputtext";
import {
  getQuotesHeaderData,
  getQuotesHeaderFromRender,
  headerFormOptionData,
  searchDisplayData,
  searchDisplayHeader,
} from "../../../mock-data/underwriting/quotes";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import DateField from "../../../components/DateField/Datefield";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputTextarea } from "primereact/inputtextarea";
import useRenderDropdown from "../../../components/DropDown/dropDown";

const QuotesHeader = ({ quotesFormData, onUpdateParty }) => {
  const overlayOpen = useRef(null);
  const renderFormData = getQuotesHeaderFromRender.formData;
  const [formData, setFormData] = useState(quotesFormData);
  const [customSearch, setCustomSearch] = useState({
    name: "",
    email: "",
    phoneno: "",
  });
  const [searchHeader, setSearchHeader] = useState(searchDisplayHeader);
  const [opTionsDrop, setOptionsDrop] = useState(headerFormOptionData);

  const autoCompleteFieldRender = (field) => {
    return (
      <AutoComplete
        onChange={handelFormValues}
        value={formData[field.name]}
        name={field.name}
        dropdown
        required={field.required}
      />
    );
  };
  const handelFormValues = (event) => {
    console.log(event, "event");
    if(typeof event.value === 'object') {
      setFormData({
        ...formData,
        [event.target.name]: `${event.value.code}-${event.value.name}`,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.value,
      });
    }
    if(event.target.name === 'sourceType') {
      onUpdateParty({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
    // if(event.target.name === 'sourceType' && event.value.name !== 'Direct') {
    // }
  };

  useEffect(() => {
    let search = searchHeader.filter(
      (data) =>
        data.name === customSearch.name ||
        data.email === customSearch.email ||
        data.phoneno === customSearch.phoneno
    );
    setSearchHeader(search);
  }, [customSearch]);

  const getDateField = (name, value) => {
    setFormData({ ...formData, [name]: value });
    onUpdateParty({ ...formData, [name]: value });
  };
  const handleSeachInputChange = (e) =>
    setCustomSearch({ ...customSearch, [e.target.name]: e.target.value });

  const renderDropdown = useRenderDropdown(formData, opTionsDrop, handelFormValues);

  return (
    <>
      {renderFormData.map((field) => {
        if (field.fieldType === "inputText") {
          return (
            <div className="w-1/3 p-2">
              <label>
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              <InputText
                onChange={handelFormValues}
                value={formData[field.name]}
                name={field.name}
                required={field.required}
              />
            </div>
          );
        } else if (field.fieldType === "inputNumber") {
          return (
            <div className="w-1/3 p-2">
              <label>
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              <InputNumber
                onValueChange={handelFormValues}
                value={formData[field.name]}
                name={field.name}
                useGrouping={false}
                required={field.required}
              />
            </div>
          );
        } else if (field.fieldType === "dateType") {
          return (
            <div className="w-1/3 p-2">
              <label>
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              <DateField
                name={field.name}
                onChange={getDateField}
                value={formData[field.name]}
                required={field.required}
              />
            </div>
          );
        } else if (field.fieldType === "dropDown") {
          return (
            <div className="w-1/3 p-2">
              <label>
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              {renderDropdown(field)}
            </div>
          );
        } else if (field.fieldType === "autoComplete") {
          return (
            <div className="w-1/3 p-2">
              <label>
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              {autoCompleteFieldRender(field)}
            </div>
          );
        } else if (field.fieldType === "checkBox") {
          return (
            <div className="w-1/3 p-2 flex items-center">
              <label htmlFor="checkbox" className="pr-2">
                {field.label}
              </label>
              <Checkbox
                onChange={handelFormValues}
                value={formData[field.name]}
                name={field.name}
                id="checkbox"
                checked={true}
                required={field.required}
              />
            </div>
          );
        } else if (field.fieldType === "overlay") {
          return (
            <div className="w-1/3 p-2">
              <label htmlFor="checkbox" className="pr-2">
                {field.label}{" "}
                {field.required && (
                  <span className="text-red-600 text-xl">*</span>
                )}
              </label>
              <div className="flex items-center add-autocomplete">
                <InputText
                  onChange={handelFormValues}
                  value={formData[field.name]}
                  name={field.name}
                  required={field.required}
                />
                <span
                  onClick={(e) => overlayOpen.current.toggle(e)}
                  className="icon cursor-pointer"
                >
                  <i className="pi pi-search"></i>
                </span>
              </div>
              <OverlayPanel className="quotes-add-overlay" ref={overlayOpen}>
                <div className="flex items-end justify-between">
                  <div className="w-1/3 p-1">
                    <label>Name</label>
                    <InputText
                      onChange={handleSeachInputChange}
                      name="name"
                      value={customSearch.name}
                    />
                  </div>
                  <div className="w-1/3 p-1">
                    <label>Email</label>
                    <InputText
                      onChange={handleSeachInputChange}
                      name="email"
                      value={customSearch.email}
                    />
                  </div>
                  <div className="w-1/3 p-1">
                    <label>Phone No.</label>
                    <InputNumber
                      onChange={handleSeachInputChange}
                      name="phoneno"
                      value={customSearch.email}
                      useGrouping={false}
                    />
                  </div>
                  <div className="p-1 flex justify-end small-btn">
                    <Button label="Search" />
                  </div>
                </div>
                <DataTable value={searchDisplayData.data}>
                  {searchHeader.map((data) => {
                    return <Column field={data.field} header={data.header} />;
                  })}
                </DataTable>
              </OverlayPanel>
            </div>
          );
        } else if (field.fieldType === "address") {
          return (
            <>
              <div className="w-1/3 p-2">
                <label>{field.label}</label>
                <InputTextarea />
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default QuotesHeader;
