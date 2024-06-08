import { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "../Styles/DetailLoginPage.css";
import jsonData from "../MockData/Attribute.json";
import claimsData from "../MockData/Claim.json";
import RiData from "../MockData/Ri.json";
import InputField from "../../../components/InputField/InputField";
import CustomButton from "../../../components/Button/CustomButton";
import { Checkbox } from "primereact/checkbox";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";

export default function AttributesTab() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, name) => {
    const { value, checked, type } = e;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const renderAttributeBox = (data) => {
    return (
      <div className="attributeBox" key={data.label}>
        <p className="attributeText">{data.label}</p>
        {data.type === "checkbox" ? (
          <div className="attributeCheckBox">
            <Checkbox
              checked={formData[data.label] || false}
              onChange={(e) => handleInputChange(e, data.label)}
            />
          </div>
        ) : data.type === "dropdown" ? (
          <div className="attributeDropdown">
            <AutoCompleteField
              className="w-1/1 p-1"
              name={data.label}
              value={formData[data.label] || ""}
              onChange={(e) => handleInputChange(e, data.label)}
              options={data.options}
              dropdown
            />
          </div>
        ) : (
          <div className="att">
            <InputField
              type="text"
              className="attributeInputField small"
              name={data.label}
              value={formData[data.label] || ""}
              onChange={(e) => handleInputChange(e, data.label)}
            />
          </div>
        )}
      </div>
    );
  };

  const addRow = () => {};

  return (
    <div>
      <div className="attributeContainer">
        <p className="attributeName">Attributes</p>
        <CustomButton label="ADD" className="small-btn -ml-16" onClick={addRow} />
      </div>
      <TabView>
        <TabPanel header="UW">
          <div className="attributeListing">
            {jsonData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Claim">
          <div className="attributeListing">
            {claimsData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="RI">
          <div className="attributeListing">
            {RiData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
}
