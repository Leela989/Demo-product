import { Card } from "primereact/card";
import QuotesHeader from "./sub-components/quotesHeader";
import { Button } from "primereact/button";
import QuotesTabComponent from "./sub-components/quotesTabComponent";
import { Steps } from "primereact/steps";
import { useEffect, useState } from "react";
import Header from "./sub-components/header";
import QuotesRisk from "./sub-components/quotes-risk";
import DocumentUpload from "./sub-components/document-upload";
import Approval from "./sub-components/approval";
import PremiumSummary from "./sub-components/premium-summary";
import OtherDetails from "./sub-components/other-details";
import DocumentPreview from "./sub-components/document-preview";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const QuotesListing = () => {
  const {risk, lob, type, id} = useParams();
  const {state} = useLocation();
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault(); // Prevent the default anchor click behavior
    navigate(-1); // Navigate back
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      label: "Header",
    },
    {
      label: "Risk ",
    },
    {
      label: "Other Details",
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
      label: "Document Preview",
    },
  ];

  const DisplayQuotesList = () => {
    switch (activeIndex) {
      case 0:
        return <Header />;
      case 1:
        return <QuotesRisk />;
      case 2:
        return <OtherDetails />;
      case 3:
        return <DocumentUpload />;
      case 4:
        return <PremiumSummary />;
      case 5:
        return <Approval />;
      case 6:
        return <DocumentPreview />;
      default:
        return;
    }
  };
  return (
    <>
      <div className="card mb-5">
        <div className="flex items-center justify-between mb-5">
          <p className="bread-crumbs flex-1"><span className="go-back" onClick={handleGoBack}>{risk}</span> / <span>{lob.split('-').reverse().join('-')}</span></p>
          <div className="statusList">
            <div className="status">
              <p>Status:</p>
              <p>Pending</p>
            </div>
            <div className="createdBy">
              <p>Created By:</p>
              <p>User</p>
            </div>
            <div className="createdOn">
              <p>Created On :{" "}</p>
              <p>{new Date().toDateString()}</p>
            </div>
          </div>
        </div>
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
