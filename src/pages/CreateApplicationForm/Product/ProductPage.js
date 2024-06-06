import React from "react";
import LoginContentPage from "./LoginContentPage";
import DiscountLoading from "../Product/DiscountLoading/DiscountLoading";
import AttrubutesTab from "./AttributesTab";
import TabComponent from "../Product/TabComponent";
import '../Styles/DetailLoginPage.css';
import CustomButton from "../../../components/Button/CustomButton";

function ProductPage() {
  return (
    <div className="createFormPage">
      <div>
        <LoginContentPage />
      </div>
      <div className="flex pt-8">
        <TabComponent />
        <div className="attributeTab">
          <AttrubutesTab />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
