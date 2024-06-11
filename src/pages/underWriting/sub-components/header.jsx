import { Card } from "primereact/card";
import QuotesHeader from "./quotesHeader";
import { Button } from "primereact/button";
import QuotesTabComponent from "./quotesTabComponent";
import {
  getQuotesHeaderData,
  getQuotesHeaderFromRender,
} from "../../../mock-data/underwriting/quotes";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

const Header = () => {
  const partyInitialState = { partyRole: "", partyID: "", address: "" };
  const [partyDetails, setPartyDetails] = useState(
    getQuotesHeaderData.partyDetails ?? []
  );
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
      case "inputText":
        return (
          <div className="">
            <p>{fieldData.label}</p>
            <InputText value={value} onChange={onChange} />
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
            <p className="text-xl font-bold flex-1">Party Information</p>
            <div className="small-btn">
              <Button label="Add Party" onClick={handelPartyAdd} />
            </div>
          </div>
          <div className="party-details">
            
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
