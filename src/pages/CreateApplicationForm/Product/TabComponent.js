import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Deductible from "../Product/Deductible/Deductible";
import Conditions from "../Product/Conditions/Condition";
import Charge from "../Product/Charge/Charge";
import DiscountLoading from "../Product/DiscountLoading/DiscountLoading";

const TabComponent = () => {
  const scrollableTabs = Array.from({ length: 50 })

  return (
    <div className="flex-1 tab-content-section">
      <div style={{ display: "flex" }}>
        <div>
          <TabView>
            <TabPanel header="Discount/Loading" className="tabs">
              <DiscountLoading/>
            </TabPanel>
            <TabPanel header="Conditions" className="tabs">
              <Conditions />
            </TabPanel>
            <TabPanel header="Deductible">
              <Deductible />
            </TabPanel>
            <TabPanel header="Charge">
              <Charge />
            </TabPanel>
          </TabView>
        </div>
      </div>
      
    </div>
  );
}

export default TabComponent;
