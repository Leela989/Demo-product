import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import {
  getQuotesTableHeaderData,
  quotesTabTableInitialData,
} from "../../../mock-data/underwriting/quotes";
import CustomTable from "../../../components/CustomTable/CustomTable";
import CustomButton from "../../../components/Button/CustomButton";
import { Card } from "primereact/card";

const QuotesTabComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [quotesTabTableData, setQuotesTabTableData] = useState(
    quotesTabTableInitialData
  );
  const {
    conditions,
    applicableCurrency,
    hypothecation,
    prevInsurenceDetails,
    surveyorDetails,
    riDetails,
  } = getQuotesTableHeaderData;
  const quotesTabData = [
    {
      header: "Conditions",
      tableInitialData: quotesTabTableData.conditions.value,
      tableHeaderData: conditions.header,
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
      header: "Survey Details",
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
    <Card className="plan-tab-container">
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
      <CustomButton
        label={"Add"}
        className={"top-button small-btn"}
      />
    </Card>
  );
};

export default QuotesTabComponent;
