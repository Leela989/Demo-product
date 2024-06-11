import { Card } from "primereact/card";
import QuotesHeader from "./sub-components/quotesHeader";
import { Button } from "primereact/button";
import QuotesTabComponent from "./sub-components/quotesTabComponent";
import { Steps } from "primereact/steps";
import { useEffect, useState } from "react";
import Header from "./sub-components/header";
import QuotesRisk from "./sub-components/quotes-risk";

const QuotesListing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "Header",
    },
    {
      label: "Risk & Othe Details",
    },
    {
      label: "Document Upload",
    },
    {
      label: "Premium Summary View",
    },
    {
      label: "Approval",
    },
    {
      label: "Document Download",
    },
  ];
  
  const DisplayQuotesList = () => {
    switch (activeIndex) {
      case 0:
        return <Header />;
      case 1:
        return <QuotesRisk />;
      default:
        return;
    }
  };
  return (
    <>
      <div className="card mb-5">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
        />
      </div>
      {DisplayQuotesList()}
    </>
  );
};

export default QuotesListing;
