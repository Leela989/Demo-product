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
import { useEffect, useMemo, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import useRenderDropdown from "../../../components/DropDown/dropDown";

const Header = () => {
  const overlayOpen = useRef(null);
  const partyInitialState = { partyRole: "", partyID: "", address: "" };
  const [partyDetails, setPartyDetails] = useState(
    getQuotesHeaderData.partyDetails ?? []
  );
  const [quotesFormData, setQuotesFormData] = useState(
    getQuotesHeaderData.formData
  );
  const [customSearch, setCustomSearch] = useState({
    name: "",
    email: "",
    phoneno: "",
  });
  const [rolesearchResult, setRolesearchResult] = useState({
    data: [],
    list: true,
  });
  const [searchHeader, setSearchHeader] = useState(searchDisplayHeader);

  const dropdownOptions = {
    partyRole: [
      { code: "01", name: "Customer" },
      { code: "02", name: "Insured" },
      { code: "03", name: "Agent" },
      { code: "04", name: "Broker" },
    ],
  };

  const handleSeachInputChange = (e, field = "") => {
    console.log(e, field, "event");
    let targetName = field === "" ? e.target.name : field;
    let targetvalue = field === "" ? e.target.value : e.value;
    setCustomSearch({ ...customSearch, [targetName]: targetvalue });
  };

  const handleShowResult = () => {
    console.log(customSearch, "customSearch");
    if (!customSearch.name && !customSearch.email && !customSearch.phoneno) {
      setRolesearchResult({ ...rolesearchResult, data: [] });
    } else {
      const filteredData = searchDisplayData.data.filter((item) => {
        return (
          item.name.toLowerCase().includes(customSearch.name.toLowerCase()) &&
          item.email.toLowerCase().includes(customSearch.email.toLowerCase()) &&
          item.phoneno.toString().includes(customSearch.phoneno)
        );
      });
      setRolesearchResult({ ...rolesearchResult, data: filteredData });
    }
  };

  const handlePartyUpdate = (event) => {
    console.log(event, "eventsample");
    // setPartyDetails([]);
  };

  const renderPartyDropdown = useRenderDropdown(
    "",
    dropdownOptions,
    handlePartyUpdate
  );

  const renderField = (fieldData, party, onChange) => {
    const type = fieldData.fieldType;
    const value = party[fieldData.name];

    switch (type ?? "") {
      case "dropDown":
        return (
          <div className="py-1">
            <p className="mr-3">{fieldData.label}</p>
            {renderPartyDropdown(fieldData, party)}
            {/* <p style={{fontWeight: 600, fontSize: '18px'}}>{party[fieldData.name]}</p> */}
          </div>
        );
      case "overlay":
        return (
          <div>
            <label htmlFor="checkbox" className="pr-2">
              {fieldData.label}{" "}
              {fieldData.required && (
                <span className="text-red-600 text-xl">*</span>
              )}
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
                    onChange={(e) => handleSeachInputChange(e, "phoneno")}
                    name="phoneno"
                    value={customSearch.phoneno}
                    useGrouping={false}
                  />
                </div>
                <div className="p-1 flex justify-end small-btn">
                  <Button onClick={handleShowResult} label="Search" />
                </div>
              </div>
              {rolesearchResult.data && (
                <DataTable value={rolesearchResult.data}>
                  {searchHeader.map((data) => {
                    return <Column field={data.field} header={data.header} />;
                  })}
                </DataTable>
              )}
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

  const onUpdateParty = (data) => {
    setQuotesFormData(data);
    console.log(data, "list");
    if (data.sourceType.name !== "Direct" && partyDetails.length <= 3) {
      let DataList = partyDetails;
      partyDetails.length >= 3 && DataList.pop();
      let tempInitialData = {
        ...partyInitialState,
        partyRole: data.sourceType.name,
      };
      let tempPartyData = [...partyDetails, tempInitialData];
      setPartyDetails(tempPartyData);
    } else if (partyDetails.length >= 3) {
      let tempPartyData = partyDetails;
      tempPartyData.pop();
      setPartyDetails(tempPartyData);
    }
  };

  return (
    <>
      <div className="flex">
        <Card className="header-card flex-1">
          <div className="quotes-form-container flex align-start flex-wrap">
            <QuotesHeader
              quotesFormData={quotesFormData}
              onUpdateParty={onUpdateParty}
            />
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
                  {renderField(fieldData, party, (e) =>
                    handlePartyChange(index, fieldData.name, e.target.value)
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
