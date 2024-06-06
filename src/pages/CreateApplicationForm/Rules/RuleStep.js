import React, { useState } from "react";
import InputField from "../../../components/InputField/InputField";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import "./RuleStep.css";
import { InputTextarea } from "primereact/inputtextarea";

function RuleStep() {
  const [value, setValue] = useState("");
  const [ruleData, setRuleData] = useState({
    ruleId: "",
    event: "",
  });

  const handleInputChange = ({ name, value }) => {
    setRuleData({ ...ruleData, [name]: value });
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
      </div>

      <div className="SourceCard">
        <h1 className="purposeText">Source</h1>
        <InputTextarea
          className="sourceTextArea"
          autoResize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
        />
      </div>
    </div>
  );
}

export default RuleStep;
