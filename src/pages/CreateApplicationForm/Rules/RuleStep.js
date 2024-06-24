import React, { useState, useRef, useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import "./RuleStep.css";
import { InputTextarea } from "primereact/inputtextarea";
import CustomButton from "../../../components/Button/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import rulesList from "./RulesList.json";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";

function RuleStep() {
  const menuLeft = useRef(null);
  const toast = useRef(null);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const [rules_data, set_rules_data] = useState(rulesList[0].rules);
  const [disable_mode, set_disable_mode] = useState(true);
  const [selectedIndex, set_selected_index] = useState(null);
  const [selected_row_data, set_selected_row_data] = useState({});
  const [unique_key, set_unique_key] = useState(0);
  const [ruleData, setRuleData] = useState({
    ruleId: "",
    event: "",
    purpose: "",
    action: "",
    source: "",
    ruleLibrary: "",
  });

  useEffect(() => {
    if (productKey == 2301 && rules_data.length > 0) {
      const firstRecord = rules_data[0];
      setRuleData({
        ruleId: firstRecord.id,
        event: firstRecord.event || "",
        purpose: firstRecord.rule_description.split("-")[1],
        action: firstRecord.action || "",
        source: firstRecord.source || "",
        ruleLibrary: firstRecord.ruleLibrary,
      });
      set_selected_index(0);
      set_selected_row_data(firstRecord);
      set_disable_mode(false);
      set_unique_key(unique_key + 1);
    }
    else{
      set_rules_data([]);
    }
  }, []);

  const uniqueRuleLibraryOptions = [
    {
      name: "01-Policy duration should be either 1 or 2 years for Domestic Maid Policy.",
    },
    { name: "02-Minimum Policy premium should not be less than $1000." },
    {
      name: "03-EDG entitiled waiver excess up to $1000. Please check Excess Buy Down.",
    },
    {
      name: "04-Minimum Policy Remaining excess $300. Need higher Authority to Approve",
    },
    {
      name: "05-Business Handler does not belong to the Marketing Department entered!",
    },
    { name: "06-Policy has UnNamed Insured Person/Risk" },
    {
      name: "07-Referral Vehicle Make / Model, Need higher authority to approve.",
    },
    {
      name: "08-Vehicle Age is Greater than 3 for ExcelDrive Prestige Risk(Non Mercedes Benz), Need higher authority to approve.",
    },
  ];

  const handleInputChange = (name, value) => {
    setRuleData({ ...ruleData, [name]: value });
  };

  const handleSubmit = () => {
    const newRow = {
      ...ruleData,
      rule_description: ruleData.ruleId + "-" + ruleData.purpose,
    };

    if (selectedIndex !== null) {
      const updatedRulesData = rules_data.map((rule, index) =>
        index === selectedIndex ? newRow : rule
      );
      set_rules_data(updatedRulesData);
      set_selected_index(null);
    } else {
      set_rules_data([...rules_data, newRow]);
    }

    setRuleData({
      ruleId: "",
      event: "",
      purpose: "",
      action: "",
      source: "",
      ruleLibrary: "",
    });
    const curKey = unique_key + 1;
    set_unique_key(curKey);
    set_disable_mode(true);
    showSuccess();
  };

  const optionsForEvent = [
    { name: "On Quote Approval" },
    { name: "On Policy Approval" },
    { name: "On Renewal" },
  ];

  const items = [{ name: "Accept" }, { name: "Decline" }, { name: "Referral" }];

  const handle_new_rule_add = () => {
    set_disable_mode(false);
    setRuleData({
      ruleId: "",
      event: "",
      purpose: "",
      action: "",
      source: "",
      ruleLibrary: "",
    });
    const curKey = unique_key + 1;
    set_unique_key(curKey);
    set_selected_index(null);
  };

  const handleEdit = (rowData, rowIndex) => {
    set_selected_index(rowIndex);
    set_selected_row_data(rowData);
    set_disable_mode(false);
    setRuleData({
      ruleId: rowData.id,
      event: rowData.event || "",
      purpose: rowData.rule_description.split("-")[1],
      action: rowData.action || "",
      source: rowData.source || "",
      ruleLibrary: rowData.ruleLibrary || "",
    });
    set_unique_key(unique_key + 1);
  };

  const rule_action_options = [
    { label: "View" },
    {
      label: "Edit",
      command: () => handleEdit(selected_row_data, selectedIndex),
    },
    { label: "Delete" },
  ];

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Submitted Successfully",
      life: 3000,
    });
  };

  const actionBodyTemplate = (rowData, rowIndex) => (
    <div className="kebab-menu-container">
      <Menu
        model={rule_action_options}
        popup
        ref={menuLeft}
        id="popup_menu_left"
      />
      <Button
        rounded
        text
        icon="pi pi-ellipsis-v"
        onClick={(event) => {
          set_selected_row_data(rowData);
          set_selected_index(rowIndex);
          menuLeft.current.toggle(event);
        }}
        aria-controls="popup_menu_left"
        aria-haspopup
      />
    </div>
  );

  const render_rules_header = () => (
    <div className="flex justify-end">
      <CustomButton
        label="+ADD"
        onClick={handle_new_rule_add}
        className="small-btn mt-4 -ml-16"
      />
    </div>
  );

  return (
    <div>
      <div className="ruleCard">
        <Toast ref={toast} />
        <DataTable
          value={rules_data}
          scrollable
          scrollHeight="200px"
          paginator
          rows={5}
          header={render_rules_header}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="rule_description"
            header="Rules"
            body={(rowData) => (
              <InputField
                type="text"
                value={rowData.rule_description}
                disabled
                onChange={(e) =>
                  handleInputChange("rule_description", e.target.value)
                }
              />
            )}
          />
          <Column
            header="Action"
            headerClassName="action"
            bodyClassName="action"
            body={(rowData, { rowIndex }) =>
              actionBodyTemplate(rowData, rowIndex)
            }
            style={{ width: "15%" }}
          />
        </DataTable>
      </div>
      <div className="ruleCard" key={unique_key}>
        <div className="rulesHeader">
          <InputField
            className="p-1"
            name="ruleId"
            label="Rule ID"
            type="text"
            value={ruleData.ruleId}
            onChange={(value, e) => handleInputChange("ruleId", e)}
            disabled={disable_mode}
          />
          <AutoCompleField
            className="p-1"
            name="event"
            label="Event"
            value={ruleData.event}
            onChange={(value) => handleInputChange("event", value)}
            options={optionsForEvent}
            dropdown
            disabled={disable_mode}
          />
        </div>

        <div className="purposeContainer">
          <h1 className="purposeText">Purpose</h1>
          <InputTextarea
            className="purposeTextArea"
            autoResize
            name="purpose"
            value={ruleData.purpose}
            onChange={(e) => handleInputChange("purpose", e.target.value)}
            rows={5}
            cols={30}
            disabled={disable_mode}
          />
          <div className="flex">
            <AutoCompleField
              className="w-3/4 p-1"
              name="ruleLibrary"
              label="Rule Library"
              value={ruleData.ruleLibrary}
              onChange={(value) => handleInputChange("ruleLibrary", value)}
              options={uniqueRuleLibraryOptions}
              dropdown
              disabled={disable_mode || (productKey == 2301)}
            />
            <div className="rulesHeader ml-6">
              <AutoCompleField
                className="w-4/4 p-1"
                name="action"
                label="Action"
                value={ruleData.action}
                onChange={(value) => handleInputChange("action", value)}
                options={items}
                dropdown
                disabled={disable_mode}
              />
            </div>
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
          onChange={(e) => handleInputChange("source", e.target.value)}
          rows={5}
          cols={30}
          disabled={disable_mode}
        />
        <div className="submitButton">
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default RuleStep;
