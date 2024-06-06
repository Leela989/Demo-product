import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import TabNames from '../MockData/RiskTabNames.json';
import DiscountLoadingComponent from '../../Product/DiscountLoading/DiscountLoading';
import ConditionsComponent from '../../Product/Conditions/Condition';
import DeductiblesComponent from '../../Product/Deductible/Deductible';
import RiskAttributesComponent from '../../Risk/RiskTabView/RiskAttributes';
import CoverComponent from '../RiskTabView/RiskCover';
import SMIComponent from '../RiskTabView/RiskSMI';


function RiskTabs() {
  const componentBasedOnName = (name) => {
    switch (name) {
      case "Risk Attributes":
        return <RiskAttributesComponent />;
      case "Cover":
        return <CoverComponent />;
      case "SMI":
        return <SMIComponent />;
      case "Discount & Loading":
        return <DiscountLoadingComponent />;
      case "Conditions":
        return <ConditionsComponent />;
      case "Deductibles":
        return <DeductiblesComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="attributesContainer">
        <TabView>
          {TabNames.map((tab,index) => (
            <TabPanel key={index} header={tab.name}>
                {componentBasedOnName(tab.name)}
            </TabPanel>
          ))}
        </TabView>
      </div>
    </div>
  );
}

export default RiskTabs;

