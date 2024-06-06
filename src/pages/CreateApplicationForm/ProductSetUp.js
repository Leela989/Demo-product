import React, { useEffect, useState } from "react";
// import './ProductSetup.css';
import { Steps } from "primereact/steps";
import RiskStep from "./Risk/RiskStep";
import RatingStep from "./Rating/RatingStep";
import RuleStep from "./Rules/RuleStep";
import ProductPage from "./Product/ProductPage";
import CustomButton from "../../components/Button/CustomButton";

const ProductSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    setPrevButtonDisabled(activeIndex === 0);
    setNextButtonDisabled(activeIndex === items.length - 1);
  }, [activeIndex]);

  const items = [
    { label: "Product" },
    { label: "Risk" },
    { label: "Rating" },
    { label: "Rules" },
  ];

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="card">
      <div className="productStepperBox">
        <div className="productStepper">
          <Steps
            model={items}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly={false}
            className="stepper"
          />
        </div>
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
            <p>Created On:</p>
            <p>Date</p>
          </div>
        </div>
      </div>
      <div className="bodyContainer">
        {activeIndex === 0 && <ProductPage />}
        {activeIndex === 1 && <RiskStep />}
        {activeIndex === 2 && <RatingStep />}
        {activeIndex === 3 && <RuleStep />}
      </div>
      <div className="navigationButtons">
        <CustomButton label="Previous" disabled={prevButtonDisabled} onClick={handlePrevious} />
        <CustomButton label="Next" disabled={nextButtonDisabled} onClick={handleNext} />
      </div>
    </div>
  );
};

export default ProductSetup;
