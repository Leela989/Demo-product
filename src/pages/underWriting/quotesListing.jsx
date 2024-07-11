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
import { headerData } from "../../mock-data/underwriting/editquotes-data";
import { getQuotesHeaderData } from "../../mock-data/underwriting/quotes";

const QuotesListing = () => {
  const {risk, lob, type, id} = useParams();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [riskHeaderData, setRiskHeaderData] = useState();

  useEffect(() => {
    if (type === "edit") {
      let headerEditData = headerData.data.find(
        (data) => data.key === Number(id)
      );
      setRiskHeaderData(headerEditData);
    } else if (type === "new") {
      setRiskHeaderData(getQuotesHeaderData);
    }
  }, [id, type]);

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
        return riskHeaderData ? <Header riskHeaderData = {riskHeaderData} /> : '';
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
    riskHeaderData &&
    <>
      <div className="card mb-5">
        <div className="flex items-center justify-between mb-5">
          <p className="bread-crumbs flex-1"><span className="go-back" onClick={handleGoBack}>{risk}</span> / <span>{lob.split('-').reverse().join('-')}</span> <span className="text-sm">{riskHeaderData.quotaion}</span></p>
          <div className="statusList">
            <div className="status">
              <p className="mr-1">Status:</p>
              <p className="font-bold">Pending</p>
            </div>
            <div className="createdBy">
              <p className="mr-1">Created By:</p>
              <p className="font-bold">User</p>
            </div>
            <div className="createdOn">
              <p className="mr-1">Created On :</p>
              <p className="font-bold">{riskHeaderData.recordDate}</p>
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
