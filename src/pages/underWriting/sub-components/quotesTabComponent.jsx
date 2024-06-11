import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import {
  getQuotesTableHeaderData,
  quotesTabTableInitialData,
} from "../../../mock-data/underwriting/quotes";
import CustomTable from "../../../components/CustomTable/CustomTable";

const QuotesTabComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quotesTabTableData, setQuotesTabTableData] = useState(
    quotesTabTableInitialData
  );
  const {
    discountLoading,
    deductible,
    conditions,
    chargeTax,
    commission,
    applicableCurrency,
    hypothecation,
    prevInsurenceDetails,
    surveyorDetails,
    riDetails,
  } = getQuotesTableHeaderData;
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
      header: "Conditions",
      tableInitialData: quotesTabTableData.conditions.value,
      tableHeaderData: conditions.header,
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
    {
      header: "Applicable Currencies",
      tableInitialData: quotesTabTableData.applicableCurrency.value,
      tableHeaderData: applicableCurrency.header,
    },
    {
      header: "Hypothecation",
      tableInitialData: quotesTabTableData.hypothecation.value,
      tableHeaderData: hypothecation.header,
    },
    {
      header: "Prv. Insurence Details",
      tableInitialData: quotesTabTableData.prevInsurenceDetails.value,
      tableHeaderData: prevInsurenceDetails.header,
    },
    {
      header: "Survey Or Details",
      tableInitialData: quotesTabTableData.surveyorDetails.value,
      tableHeaderData: surveyorDetails.header,
    },
    {
      header: "RI Details",
      tableInitialData: quotesTabTableData.riDetails.value,
      tableHeaderData: riDetails.header,
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
    <>
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
    </>
  );
};

export default QuotesTabComponent;
