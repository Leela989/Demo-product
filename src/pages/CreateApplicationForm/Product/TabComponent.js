import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Deductible from "../Product/Deductible/Deductible";
import Conditions from "../Product/Conditions/Condition";
import Charge from "../Product/Charge/Charge";
import DiscountLoading from "../Product/DiscountLoading/DiscountLoading";
import CustomButton from "../../../components/Button/CustomButton";
import Branches from "./Branches/Branches";
import DocumentPrints from "./DocumentPrints/DocumentPrints";

const TabComponent = ({data}) => {

  console.log('tabComponent', data);
  return (
    <div className="tab-content-section">
      <TabView className="w-full">
      <TabPanel header="Branches" className="tabs">
          <Branches productData={data}/>
        </TabPanel>
        <TabPanel header="Discounts/Loading" className="tabs">
          <DiscountLoading productData={data}/>
        </TabPanel>
        <TabPanel header="Conditions" className="tabs">
          <Conditions productData={data}/>
        </TabPanel>
        <TabPanel header="Deductibles">
          <Deductible productData={data}/>
        </TabPanel>
        <TabPanel header="Charge & Tax">
          <Charge productData={data}/>
        </TabPanel>
        <TabPanel header="Document Prints" className="tabs">
          <DocumentPrints productData={data}/>
        </TabPanel>
      </TabView>
      {/* <CustomButton/> */}
    </div>
  );
};

export default TabComponent;
