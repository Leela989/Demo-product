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
  driverDetails,
  geographicDetails,
  riskBlock,
  vehicleDetails,
} from "../../../mock-data/underwriting/quotes";
import { InputNumber } from "primereact/inputnumber";

import { Accordion, AccordionTab } from "primereact/accordion";

import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";

const QuotesRisk = () => {
  // const [vehicleDetail, setvehicleDetail] = useState(vehicleDetails);
  // const [driverDetail, setDriverDetail] = useState(driverDetails);
  // const [geographicDetail, setGeographicDetail] = useState(geographicDetails);

  const [riskDetailData, setRiskDetailData] = useState([
    vehicleDetails,
    driverDetails,
    geographicDetails,
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [nestedactiveIndex, setNestedactiveIndex] = useState(0);

  useEffect(() => {
    console.log(riskDetailData, "riskDetailData");
    const statueField =
    riskDetailData &&
    riskDetailData.map((data) =>{
      console.log(data,data.Objects[0].Fields, "riskDetailDatain");
        data.Objects[0].Fields.sort((a, b) => {
          if (a.Serial_no === null) return 1;
          if (b.Serial_no === null) return -1;
          return a.Serial_no - b.Serial_no;
        })
        }
        );
  }, [riskDetailData]);

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

  const renderFields = (field) => {
    if (field.Data_Type === "Text") {
      return (
        <div className="w-1/4 p-2">
          <label>{field.Field_Name}</label>
          <InputText />
        </div>
      );
    } else if (field.Data_Type === "Number") {
      return (
        <div className="w-1/4 p-2">
          <label>{field.Field_Name}</label>
          <InputNumber />
        </div>
      );
    } else if (field.Data_Type === "Date") {
      return (
        <div className="w-1/4 p-2">
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
  };
  const handleChange = (event) => {
    // console.log(event.originalEvent.target.text);
    setActiveIndex(event.index);
    console.log(riskDetailData, "riskDetailData");
  };
  const handleNestedActiveIndex = (event) => {
    setNestedactiveIndex(event.index);
  };
  return (
    <div>
      <div className="flex align-center pt-5">
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
      <div>
        {/* {riskAssesmentFactor &&
          Object.keys(riskAssesmentFactor).map((data) => {
            return (
              <div>
                <p className="text-xl font-600 pt-5 pb-3">
                  {riskAssesmentFactor[data][0].Objects[0].Object_name}
                </p>
                <div className="flex items-start flex-wrap">
                  {riskAssesmentFactor[data][0].Objects[0].Fields.map((field) =>
                    renderFields(field)
                  )}
                </div>
              </div>
            );
          })} */}
        <Accordion activeIndex={activeIndex} onTabChange={handleChange}>
          {riskBlock.Objects.map((data) => (
            <AccordionTab header={data.Object_name}>
              <Accordion
                activeIndex={nestedactiveIndex}
                onTabChange={handleNestedActiveIndex}
              >
                <AccordionTab header={data.Object_name}>Sample</AccordionTab>
              </Accordion>
            </AccordionTab>
          ))}
        </Accordion>
      </div>
      <div className="pt-5">
        <TabView>
          {riskQuotesTab.map((data) => {
            return (
              <TabPanel header={data.header}>
                <CustomTable
                  data={data.tableinitialData}
                  columns={data.tableHeaderData}
                />
              </TabPanel>
            );
          })}
        </TabView>
        {/* <CustomTable data={} columns={} /> */}
      </div>
    </div>
  );
};

export default QuotesRisk;
