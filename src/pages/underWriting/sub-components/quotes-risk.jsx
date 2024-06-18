import { InputText } from "primereact/inputtext";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { TabPanel, TabView } from "primereact/tabview";
import {
  riskTabTableHeader,
  riskTabTablecontent,
  riskTableHeaderData,
  riskValueData,
} from "../../../mock-data/underwriting/quotes-risk";
import {
  riskAssesmentFactor,
  riskBlock,
} from "../../../mock-data/underwriting/quotes";
import { InputNumber } from "primereact/inputnumber";

import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";

const QuotesRisk = () => {
  const [activeFields, setActiveFields] = useState(null);

  const riskQuotesTab = [
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
            : "last-sub-menu"
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
              <div className="flex flex-wrap form-container active-field items-end flex-1">
                {listValue.map((field, index) => {
                  if (field.Data_Type === "Text") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <InputText />
                      </div>
                    );
                  } else if (field.Data_Type === "Number") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <InputNumber />
                      </div>
                    );
                  } else if (field.Data_Type === "Date") {
                    return (
                      <div key={index} className="w-1/4 p-2">
                        <label>{field.Field_Name}</label>
                        <Calendar
                          showIcon
                          showTime
                          dateFormat="dd/mm/yy"
                          hourFormat="24"
                          className="w-full"
                        />
                      </div>
                    );
                  }
                })}
                <div className="w-1/4 p-2 ml-auto flex justify-end">
                  <Button label="Save" />
                </div>
              </div>
              <Card className="w-1/4 risk-list ml-2 h-full">
                <div className="flex items-center justify-between pb-3 small-btn">
                  <h2 className="text-xl font-bold">
                    {riskAssesmentFactor[element.name].Objects[0].Object_name}
                  </h2>
                  <Button label="Add" />
                </div>
                <div className="py-3">
                  <div className="small-btn flex items-center justify-between">
                    <h4>1001 - Motor Policy</h4>
                    <Button rounded text icon="pi pi-pencil" />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
        {subFields && subFields.length > 0 && (
          <div className="sub-menu">
            {subFields.map((data, index) => (
              <div key={index}>{renderFields(data)}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // const renderLevel = (objects) => {
  //   const objDict = {};
  //   objects.forEach(obj => {
  //     objDict[obj.Id] = { ...obj, Submenu: [] };
  //   });
  //   const menu = [];

  //   objects.forEach(obj => {
  //     if (obj.Parent_Object_Id === null) {
  //       menu.push(objDict[obj.Id]);
  //     } else {
  //       const parent = objDict[obj.Parent_Object_Id];
  //       if (parent) {
  //         parent.Submenu.push(objDict[obj.Id]);
  //       }
  //     }
  //   });
  //   console.log(menu, "menumenu");
  //   return menu;
  // }

  const renderRiskField = () => {
    return riskBlock.map((element, index) => {
      return <div key={index}>{renderFields(element)}</div>;
    });
  };

  return (
    <div>
      <Card className="mt-5">
        <div className="flex align-center">
          <div className="w-1/3 p-1 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Quotes Number :
            </label>
            <p className="font-medium">Q/10/1001/2024/0545</p>
          </div>
          <div className="w-1/3 p-1 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy From Date :
            </label>
            <p className="font-medium">10/01/2024</p>
          </div>
          <div className="w-1/3 p-1 flex items-center">
            <label className="pr-3" style={{ color: "#414141" }}>
              Policy To Date :
            </label>
            <p className="font-medium">10/02/2024</p>
          </div>
        </div>
        <div className="pt-5">
          <CustomTable
            data={riskValueData.riskMainData.value}
            columns={riskTableHeaderData.riskMainData.header}
          />
        </div>
      </Card>
      <Card className="risk-assesment-section">
        <h2 className="header-text mb-3 pt-4 pb-5 risk-header">
          Risk Assesment
        </h2>
        <div className="flex items-start">
          <div className="flex-1 mx-2">{renderRiskField()}</div>
        </div>
      </Card>
      <Card className="plan-tab-container">
        <TabView>
          {riskQuotesTab.map((data, index) => {
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
