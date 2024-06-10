import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import "./RuleStep.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import CustomButton from "../../../components/Button/CustomButton";

function RuleStep() {
  const [ruleData, setRuleData] = useState({
    ruleId: "",
    event: "",
    purpose: "",
    source: ""
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setRuleData({ ...ruleData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(ruleData);
  };

  const optionsForEvent = [
    { name: "On Submit" },
    { name: "On Click" },
    { name: "On Save" },
  ];

  return (
    <div>
      <div className="ruleCard">
        <div className="rulesHeader">
          <InputField
            className=" p-1"
            name="ruleId"
            label="Rule ID"
            value={ruleData.ruleId}
            onChange={handleInputChange}
          />
          <AutoCompleField
            className=" p-1"
            name="event"
            label="Event"
            value={ruleData.event}
            onChange={handleInputChange}
            options={optionsForEvent}
            dropdown
          />
        </div>
       
        <div className="purposeContainer">
          <h1 className="purposeText">Purpose</h1>
          <InputTextarea
            className="purposeTextArea"
            autoResize
            name="purpose"
            value={ruleData.purpose}
            onChange={handleInputChange}
            rows={5}
            cols={30}
          />
           <div className="rulesHeader">
            <AutoCompleField
              className=" p-1"
              name="ruleLibrary"
              label="Rule Library"
              value={ruleData.ruleLibrary}
              onChange={handleInputChange}
              options={optionsForEvent}
              dropdown
            />
          </div>
        </div>
      </div>

      <div className="SourceCard">
        <h1 className="purposeText">Source</h1>
        <InputTextarea
          className="sourceTextArea h-136"
          autoResize
          name="source"
          value={ruleData.source}
          onChange={handleInputChange}
          rows={5}
          cols={30}
        />
        <div className="submitButton">
            <Button label="Submit" onClick={handleSubmit} />
        </div>
      </div>

      <div>
      </div>
    </div>
  );
}

export default RuleStep;
