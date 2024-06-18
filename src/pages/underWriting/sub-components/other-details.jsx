import { useState } from "react";
import {
  getQuotesTableHeaderData,
  quotesTabTableInitialData,
} from "../../../mock-data/underwriting/quotes";
import { TabPanel, TabView } from "primereact/tabview";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";

const OtherDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quotesTabTableData, setQuotesTabTableData] = useState(
    quotesTabTableInitialData
  );

  const { discountLoading, deductible, chargeTax, commission } =
    getQuotesTableHeaderData;

  const quotesTabData = [
    {
      header: "Discount / Loading",
      tableInitialData: quotesTabTableInitialData.discountLoading.value,
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

  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

  return (
    <Card className="mt-5 plan-tab-container">
      <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
        {quotesTabData.map((tabData) => {
          return (
            <TabPanel header={tabData.header}>
              <CustomTable
                data={tabData.tableInitialData}
                columns={tabData.tableHeaderData}
              />
            </TabPanel>
          );
        })}
      </TabView>
      <CustomButton label={"Add"} className={"top-button small-btn"} />
    </Card>
  );
};

export default OtherDetails;
