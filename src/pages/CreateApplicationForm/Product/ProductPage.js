import React from "react";
import LoginContentPage from "./LoginContentPage";
import DiscountLoading from "../Product/DiscountLoading/DiscountLoading";
import AttrubutesTab from "./AttributesTab";
import TabComponent from "../Product/TabComponent";
import '../Styles/DetailLoginPage.css';
import CustomButton from "../../../components/Button/CustomButton";
import ListingPageNewData from '../../../pages/ListingPage/ListingPageNew.json';
import { useState } from "react";

function ProductPage() {
  

  let initalValues = {
    productStep: {
      headerDetails: {
        code: "",
        description: {
          "en-US": "",
          "fr-FR": "",
        },
        shortDescription: {
          "en-US": "",
          "fr-FR": "",
        },
        lineOfBusiness: "",
        effectiveFrom: "",
        effectiveTo: "",
      },
      branches: [],
      discountLoading: [],
      conditions: [],
      deductibles: [],
      charge: [],
      documentPrints: [],
    },
      riskStep: {},
      ratingStep: {},
      rulesStep: {},
    
  };

  let [values, setValues] = useState(initalValues);
  return (
    <div className="createFormPage">
      <div>
        <LoginContentPage data={ListingPageNewData}/>
      </div>
      <div className="flex pt-8">
      <div className="tab-component-container">
        <TabComponent data={ListingPageNewData}/>
      </div>
      <div className="attributes-tab-container">
        <AttrubutesTab data={ListingPageNewData} />
      </div>
      </div>
    </div>
  );
}

export default ProductPage;
