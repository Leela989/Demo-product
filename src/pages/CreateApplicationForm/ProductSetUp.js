import React, { useEffect, useState } from "react";
import { Steps } from "primereact/steps";
import RiskStep from "./Risk/RiskStep";
import RatingStep from "./Rating/RatingStep";
import RuleStep from "./Rules/RuleStep";
import ProductPage from "./Product/ProductPage";
import CustomButton from "../../components/Button/CustomButton";
import productData from "../ListingPage/ListingPageNew.json";
import { useParams } from "react-router-dom";

const ProductSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);

  useEffect(() => {
    setPrevButtonDisabled(activeIndex === 0);
    setNextButtonDisabled(activeIndex === items.length - 1);
    console.log("productData", productData);
    updateStepClasses();
  }, [activeIndex]);

  const items = [
    { label: "Product" },
    { label: "Risk" },
    { label: "Rating" },
    { label: "Rules" },
  ];

  const updateStepClasses = () => {
    const steps = document.querySelectorAll('.p-steps-number');
    steps.forEach((step, index) => {
      if (index < activeIndex) {
        step.classList.add('completed');
      } else if(index = activeIndex) {
        step.classList.add('in-progress');
      }
      else{
        step.classList.remove('completed');
      }
    });
    const step_item = document.querySelectorAll('.p-steps-item');
    step_item.forEach((step, index) => {
      if (index <= activeIndex) {
        step.classList.add('completed');
      } else if(index == activeIndex) {
        step.classList.add('in-progress');
      }
      else{
        step.classList.remove('completed');
      }
    });
  };

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
      <div className="statusList">
        <div className="product_details">
          <div className="flex">
            {/* <p>Product Name:</p> */}
            <p className="ml-1"> {productData[id]?.name} </p>
          </div>
        </div>
        <div className="product_status">
          <div className="status">
            <p>Status:</p>
            <p className="ml-1"> {productKey == 2301 ? 'Approved' : 'Pending'}</p>
          </div>
          <div className="createdBy ml-4">
            <p>Created By:</p>
            <p className="ml-1"> Azentio</p>
          </div>
          <div className="createdOn ml-4">
            <p>Created On:</p>
            <p className="ml-1"> 01/06/2024</p>
          </div>
        </div>
      </div>

      <div className="productStepper">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={true}
          className="stepper"
        />
      </div>

      <div>
        {activeIndex === 0 && <ProductPage />}
        {activeIndex === 1 && <RiskStep />}
        {activeIndex === 2 && <RatingStep />}
        {activeIndex === 3 && <RuleStep />}
      </div>
      <div className="navigationButtons">
        <CustomButton
          label="Previous"
          disabled={prevButtonDisabled}
          onClick={handlePrevious}
        />
        <CustomButton
          label="Next"
          disabled={nextButtonDisabled}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default ProductSetup;
