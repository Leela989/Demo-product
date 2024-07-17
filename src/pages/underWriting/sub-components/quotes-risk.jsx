import { InputText } from "primereact/inputtext";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { TabPanel, TabView } from "primereact/tabview";
import {
  initialriskValueData,
  riskEditTabTablecontent,
  riskTabTableHeader,
  riskTabTablecontent,
  riskTableHeaderData,
  riskValueData,
} from "../../../mock-data/underwriting/quotes-risk";
import { riskBlock, riskFactor, riskFactorData } from "../../../mock-data/underwriting/quotes";
import { InputNumber } from "primereact/inputnumber";

import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";
import { Dropdown } from "primereact/dropdown";
import { useParams } from "react-router-dom";
import { riskEditData } from "../../../mock-data/underwriting/editquotes-data";
import CheckBox from "../../../components/CheckBox/CheckBox";

const QuotesRisk = () => {
  const [activeFields, setActiveFields] = useState(null);
  const { id, type, lob } = useParams();
  const lobType = lob.split("-")[0];

  const [riskAssesmentFactor, setRiskAssesmentFactor] = useState(riskFactor);
  const [riskTabelData, setRiskTableData] = useState();
  const [riskQuotesTab, setRiskQuotesTab] = useState([]);
  const [singleRiskData, setSingleRiskData] = useState();
  const [riskAssesmentFactorData, setRiskAssesmentFactorData] = useState(riskFactorData);

  useEffect(() => {
    setRiskTableData(riskValueData.riskMainData);
  }, []);

  useEffect(() => {
    let tempSingleFieldData = riskEditData.data.filter(value => value.key === Number(id));
    console.log(tempSingleFieldData[0]?.Objects[0], "boomboom");
    setSingleRiskData(tempSingleFieldData[0]?.Objects[0]);
  }, [id]);

  useEffect(() => {
    let tempRiskQuotesTab = [];
    if(type === "edit") {
      tempRiskQuotesTab = [
        {
          header: "Covers",
          tableinitialData: riskEditTabTablecontent.covers.value,
          tableHeaderData: riskTabTableHeader.covers.header,
        },
        {
          header: "Discount Loading",
          tableinitialData: riskEditTabTablecontent.discountLoading.value,
          tableHeaderData: riskTabTableHeader.discountLoading.header,
        },
        {
          header: "Deductible",
          tableinitialData: riskTabTablecontent.deductible.value,
          tableHeaderData: riskTabTableHeader.deductible.header,
        },
        {
          header: "Conditions",
          tableinitialData: riskTabTablecontent.conditions.value,
          tableHeaderData: riskTabTableHeader.conditions.header,
        },
        {
          header: "SMI",
          tableinitialData: riskTabTablecontent.smi.value,
          tableHeaderData: riskTabTableHeader.smi.header,
        },
      ];
    } else {
      tempRiskQuotesTab = [
        {
          header: "Covers",
          tableinitialData: riskTabTablecontent.covers.value,
          tableHeaderData: riskTabTableHeader.covers.header,
        },
        {
          header: "Discount Loading",
          tableinitialData: riskTabTablecontent.discountLoading.value,
          tableHeaderData: riskTabTableHeader.discountLoading.header,
        },
        {
          header: "Deductible",
          tableinitialData: riskTabTablecontent.deductible.value,
          tableHeaderData: riskTabTableHeader.deductible.header,
        },
        {
          header: "Conditions",
          tableinitialData: riskTabTablecontent.conditions.value,
          tableHeaderData: riskTabTableHeader.conditions.header,
        },
        {
          header: "SMI",
          tableinitialData: riskTabTablecontent.smi.value,
          tableHeaderData: riskTabTableHeader.smi.header,
        },
      ];
    }
    setRiskQuotesTab(tempRiskQuotesTab);
  }, [id, type]);

  const handleExpansion = (id) => {
    setActiveFields(activeFields === id ? null : id);
  };

  const renderFields = (element) => {
    const listValue = riskAssesmentFactor[element.name].Objects[0].Fields;
    const subFields = element.Submenu;

    return (
      <div
        className={`${
          subFields && subFields.length > 0
            ? "container-sub-menu"
            : "last-sub-menu container-sub-menu"
        }`}
      >
        <div className="field-individual-container">
          <p
            onClick={() =>
              handleExpansion(riskAssesmentFactor[element.name].Objects[0].Id)
            }
            className="text-xl"
            style={{ fontWeight: "600", color: "#4338CA" }}
          >
            {riskAssesmentFactor[element.name].Objects[0].Object_name}
          </p>
          {activeFields === riskAssesmentFactor[element.name].Objects[0].Id && (
            <div className="field-container flex align-start">
              <div className="flex flex-wrap form-container active-field flex-1">
                {listValue.map((field, index) => {
                  const fieldValue = singleRiskData?.Fields.find(f => f.field_Name === field.Field_Name)?.Value || "";
                  if (field.Field_type === "inputText") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <InputText value={fieldValue} />
                      </div>
                    );
                  } else if (field.Field_type === "inputNumber") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <InputNumber value={fieldValue} />
                      </div>
                    );
                  } else if (field.Field_type === "dropDown") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <Dropdown value={fieldValue} />
                      </div>
                    );
                  } else if (field.Field_type === "Date") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <Calendar
                          value={new Date(fieldValue)}
                          showIcon
                          showTime
                          dateFormat="dd/mm/yy"
                          hourFormat="24"
                          className="w-full"
                        />
                      </div>
                    );
                  } else if (field.Field_type === "checkBox") {
                    return (
                      <div key={index} className="w-1/4 p-2 flex items-center">
                        <CheckBox onChange={()=>{console.log("checkBox hitted")}} labelName={field.Field_Name} />
                      </div>
                    );
                  }
                })}
                <div className="w-1/4 p-2 ml-auto flex justify-end">
                  <Button label="Save" />
                </div>
              </div>
              {element.Level === 1 && element.Serial_no === 1 ? null : (
                <Card className="w-1/4 risk-list ml-2 h-full">
                  <div className="flex items-center justify-end pb-3 small-btn">
                    <Button label="Add" />
                  </div>
                  <div className="py-3">
                    <div className="small-btn flex items-center justify-between">
                      <h4>1001 - Motor Policy</h4>
                      <Button rounded text icon="pi pi-pencil" />
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
        {subFields && subFields.length > 0 && (
          <div className="sub-menu">
            {subFields.map((data, index) => {
              return <div key={index}>{renderFields(data)}</div>;
            })}
          </div>
        )}
      </div>
    );
  };

  const renderRiskField = () => {
    return riskBlock.map((element, index) => {
      if (
        element.key === Number(id) ||
        (type === "new" && element.displayName === lobType)
      ) {
        return <div key={index}>{renderFields(element)}</div>;
      }
    });
  };

  const addRiskTableData = () => {
    let updatedTableData = riskTabelData;
    updatedTableData.value.push(initialriskValueData);
    setRiskTableData({...riskTabelData, value: [...updatedTableData.value]});
  }

  return (
    <div>
      <div className="mt-5 pt-3">
        <div className="flex align-center">
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Quotes Number :
            </label>
            <p className="font-medium">Q/10/1001/2024/0545</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy From Date :
            </label>
            <p className="font-medium">10/01/2024</p>
          </div>
          <div className="w-1/3 p-2 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy To Date :
            </label>
            <p className="font-medium">10/02/2024</p>
          </div>
        </div>
      </div>
      <Card className="risk-assesment-section">
        <div className="flex items-center justify-between">
          <h2 className="header-text mb-3">Risk Assesment</h2>
          <div className="small-btn">
            <Button label="Add" onClick={addRiskTableData} />
          </div>
        </div>
        <div className="pt-3 pb-5">
          {riskTabelData && (
            <CustomTable
              selectionMode="radiobutton"
              data={riskTabelData.value}
              columns={riskTableHeaderData.riskMainData.header}
            />
          )}
        </div>
        <div className="flex items-start">
          <div className="flex-1 mx-2">{renderRiskField()}</div>
        </div>
      </Card>
      <Card className="plan-tab-container">
        <TabView>
          {riskQuotesTab.length && riskQuotesTab.map((data, index) => {
            return (
              <TabPanel header={data.header} key={index}>
                <CustomTable
                  data={data.tableinitialData}
                  columns={data.tableHeaderData}
                />
              </TabPanel>
            );
          })}
        </TabView>
        <CustomButton label={"Add"} className={"top-button small-btn"} />
      </Card>
    </div>
  );
};

export default QuotesRisk;
