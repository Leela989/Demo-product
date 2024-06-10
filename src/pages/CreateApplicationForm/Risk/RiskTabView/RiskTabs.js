import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import TabNames from '../MockData/RiskTabNames.json';
import DiscountLoadingComponent from '../../Product/DiscountLoading/DiscountLoading';
import ConditionsComponent from '../../Product/Conditions/Condition';
import DeductiblesComponent from '../../Product/Deductible/Deductible';
import RiskAttributesComponent from '../../Risk/RiskTabView/RiskAttributes';
import CoverComponent from '../RiskTabView/RiskCover';
import SMIComponent from '../RiskTabView/RiskSMI';
import data from '../../../ListingPage/ListingPageNew.json';


function RiskTabs() {
  const componentBasedOnName = (name) => {
    switch (name) {
      case "Risk Attributes":
        return <RiskAttributesComponent productData={data}/>
      case "Cover":
        return <CoverComponent productData={data}/>
      case "SMI":
        return <SMIComponent productData={data}/>
      case "Discount & Loading":
        return <DiscountLoadingComponent productData={data}/>
      case "Conditions":
        return <ConditionsComponent productData={data}/>
      case "Deductibles":
        return <DeductiblesComponent productData={data}/>
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

