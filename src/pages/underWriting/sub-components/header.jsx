import { Card } from "primereact/card";
import QuotesHeader from "./quotesHeader";
import { Button } from "primereact/button";
import QuotesTabComponent from "./quotesTabComponent";
import {
  getQuotesHeaderData,
  getQuotesHeaderFromRender,
  searchDisplayData,
  searchDisplayHeader,
} from "../../../mock-data/underwriting/quotes";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";

const Header = () => {
  const overlayOpen = useRef(null);
  const partyInitialState = { partyRole: "", partyID: "", address: "" };
  const [partyDetails, setPartyDetails] = useState(
    getQuotesHeaderData.partyDetails ?? []
  );
  const [quotesFormData, setQuotesFormData] = useState(getQuotesHeaderData.formData);
  const [customSearch, setCustomSearch] = useState({
    name: "",
    email: "",
    phoneno: "",
  });
  const [searchHeader, setSearchHeader] = useState(searchDisplayHeader);

  const handleSeachInputChange = (e) =>
    setCustomSearch({ ...customSearch, [e.target.name]: e.target.value });
  const renderField = (fieldData, value, onChange) => {
    const type = fieldData.fieldType;

    switch (type ?? "") {
      case "dropDown":
        return (
          <div className="">
            <p>{fieldData.label}</p>
            <Dropdown value={value} onChange={onChange} />
          </div>
        );
      case "overlay":
        return (
          <div>
            <label htmlFor="checkbox" className="pr-2">
              {fieldData.label} {fieldData.required && <span className="text-red-600 text-xl">*</span>}
            </label>
            <div className="flex items-center add-autocomplete">
              <InputText
                onChange={handlePartyChange}
                value={quotesFormData[fieldData.name]}
                name={fieldData.name}
                required={fieldData.required}
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
      case "partyAddress":
        return (
          <div className="">
            <p>{fieldData.label}</p>
            <InputTextarea rows={3} value={value} onChange={onChange} />
          </div>
        );
      default:
        return <div> Not Available</div>;
    }
  };

  const handelPartyAdd = () => {
    setPartyDetails((prev) => [...prev, partyInitialState]);
  };

  const handlePartyChange = (index, field, value) => {
    const updatedPartyDetails = partyDetails.map((party, i) => 
      i === index ? { ...party, [field]: value } : party
    );
    setPartyDetails(updatedPartyDetails);
  };

  return (
    <>
      <div className="flex">
        <Card className="header-card flex-1">
          <div className="quotes-form-container flex align-start flex-wrap">
            <QuotesHeader />
            <div className="flex items-end justify-end w-full p-2">
              <Button label="Save" />
            </div>
          </div>
        </Card>
        <Card className="header-card party-container">
          <div className="flex justify-between items-center party-header">
            <p className="text-xl font-bold flex-1">Party</p>
            <div className="small-btn">
              <Button rounded icon="pi pi-external-link" />
              <Button rounded icon="pi pi-plus" onClick={handelPartyAdd} />
            </div>
          </div>
          {partyDetails?.map((party, index) => (
              <div className="party-details" key={index}>
                {getQuotesHeaderFromRender.partyDetails.map((fieldData) => (
                  <div className="pb-3" key={fieldData.name}>
                    {renderField(
                      fieldData,
                      party[fieldData.name],
                      (e) => handlePartyChange(index, fieldData.name, e.target.value)
                    )}
                  </div>
                ))}
              </div>
            ))}
        </Card>
      </div>
      <Card className="quotes-tab-container mt-4">
        <QuotesTabComponent />
      </Card>
    </>
  );
};

export default Header;
