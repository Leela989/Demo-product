import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import InputField from "../../../components/InputField/InputField";
import CustomButton from "../../../components/Button/CustomButton";
import { Checkbox } from "primereact/checkbox";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import DialogueBox from "../../../components/DialogueBox/DialogueBox";
import jsonData from "../MockData/Attribute.json";
import RiData from "../MockData/Ri.json";
import "../Styles/DetailLoginPage.css";

export default function AttributesTab() {
  const [formData, setFormData] = useState({ attributeName: "", fieldType: "" });
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("UW");

  const [uwData, setUwData] = useState(jsonData.data.uw);
  const [claimsData, setClaimsData] = useState(jsonData.data.claims_data);
  const [riData, setRiData] = useState(RiData);

  const handleAttributeNameChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      attributeName: value,
    }));
  };

  const handleFieldTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      fieldType: value,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderAttributeBox = (data) => {
    return (
      <div className="attributeBox" key={data.label}>
        <p className="attributeText">{data.label}</p>
        {data.type === "checkbox" ? (
          <div className="attributeCheckBox">
            <Checkbox
              checked={formData[data.label] || false}
              onChange={(e) => handleInputChange(data.label, e.checked)}
            />
          </div>
        ) : data.type === "dropdown" ? (
          <div className="attributeDropdown">
            <AutoCompleteField
              className="w-1/1 p-1"
              name={data.label}
              value={formData[data.label] || ""}
              onChange={(e) => handleInputChange(data.label, e.value)}
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
              onChange={(e) => handleInputChange(data.label, e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  const handleAddClick = () => {
    setAddDialogVisible(true);
  };

  const handleSave = () => {
    const newAttribute = {
      label: formData.attributeName,
      type: formData.fieldType,
      options: formData.fieldType === "dropdown" ? [] : undefined,
    };

    if (activeTab === "UW") {
      setUwData([...uwData, newAttribute]);
    } else if (activeTab === "Claims") {
      setClaimsData([...claimsData, newAttribute]);
    } else if (activeTab === "RI") {
      setRiData([...riData, newAttribute]);
    }

    setFormData({ attributeName: "", fieldType: "" });
    setAddDialogVisible(false);
  };

  const closeModal = () => {
    setAddDialogVisible(false);
  };

  const uw_popup = () => {
    return (
      <div>
        <div>
          <InputField
            type="text"
            className="attributeInputField small"
            label="Attribute Name"
            labelType="left"
            name="attributeName"
            value={formData.attributeName}
            onChange={(e) => handleAttributeNameChange(e.target.value)}
          />
        </div>
        <div className="mt-9">
          <AutoCompleteField
            className="w-1/1 p-1"
            name="fieldType"
            label="Field type"
            value={formData.fieldType}
            onChange={(e) => handleFieldTypeChange(e.value)}
            options={[
              { name: "checkbox", value: "checkbox" },
              { name: "dropdown", value: "dropdown" },
              { name: "number", value: "number" },
              { name: "text", value: "text" },
            ]}
            dropdown
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="attributeContainer">
        <p className="attributeName">Attributes</p>
        <CustomButton
          label="+ADD"
          className="small-btn -ml-16"
          onClick={handleAddClick}
        />
      </div>
      <TabView activeIndex={activeTab === "UW" ? 0 : activeTab === "Claims" ? 1 : 2} onTabChange={(e) => setActiveTab(e.index === 0 ? "UW" : e.index === 1 ? "Claims" : "RI")}>
        <TabPanel header="UW">
          <div className="attributeListing">
            {uwData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="Claims">
          <div className="attributeListing">
            {claimsData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
        <TabPanel header="RI">
          <div className="attributeListing">
            {riData.map((item) => renderAttributeBox(item))}
          </div>
        </TabPanel>
      </TabView>

      {addDialogVisible && (
        <DialogueBox
          data={uw_popup()}
          header={`Add ${activeTab} Attribute`}
          yesButtonText="Add"
          visible={addDialogVisible}
          onSave={handleSave}
          onClose={closeModal}
          noButtonText="Cancel"
        />
      )}
    </div>
  );
}
