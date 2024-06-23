import { useState } from "react";
import {
  getQuotesTableHeaderData,
  quotesTabTableInitialData,
} from "../../../mock-data/underwriting/quotes";
import { TabPanel, TabView } from "primereact/tabview";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";
import { Accordion, AccordionTab } from "primereact/accordion";

const OtherDetails = () => {
  const [quotesTabTableData, setQuotesTabTableData] = useState(
    quotesTabTableInitialData
  );

  const { discountLoading, deductible, chargeTax, commission } =
    getQuotesTableHeaderData;

  const quotesTabData = [
    {
      header: "Discount / Loading",
      tableInitialData: quotesTabTableData.discountLoading.value,
      tableHeaderData: discountLoading.header,
    },
    {
      header: "Deductibles",
      tableInitialData: quotesTabTableData.deductible.value,
      tableHeaderData: deductible.header,
    },
    {
      header: "Charge & Tax",
      tableInitialData: quotesTabTableData.chargeTax.value,
      tableHeaderData: chargeTax.header,
    },
    {
      header: "Commission",
      tableInitialData: quotesTabTableData.commission.value,
      tableHeaderData: commission.header,
    },
    // {
    //   header: "FAC Placement",
    //   tableInitialData: quotesTabTableData.discountLoading.value,
    //   tableHeaderData: discountLoading.header,
    // },
  ];

  const renderAccordionHeader = (tabData) => {
    return (
      <div className="flex items-center justify-between w-full">
        <p>{tabData.header}</p>
        <CustomButton
          onClick={(event) => {
            event.stopPropagation();
          }}
          label={"Add"}
          className={"top-button small-btn flex justify-end"}
        />
      </div>
    );
  };

  return (
    <>
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
      <Card className="mt-5">
        <Accordion activeIndex={0}>
          {quotesTabData.map((tabData) => {
            return (
              <AccordionTab header={renderAccordionHeader(tabData)}>
                <CustomTable
                  data={tabData.tableInitialData}
                  columns={tabData.tableHeaderData}
                />
              </AccordionTab>
            );
          })}
        </Accordion>
      </Card>
    </>
  );
};

export default OtherDetails;
