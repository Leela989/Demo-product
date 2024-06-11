import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Address from "./address/Address";
import Associates from "./associates/Associates";
import CorporateDtls from "./corporateDtls/CorporateDtls";
import Currency from "./currency/Currency";
import DirectorDetails from './directorDtls/DirectorDtls';
import License from './license/License';
import LineOfBusiness from './lineOfBusiness/LineOfBusiness';
import Management from './management/Management';
import RegisteredOffice from './registeredOffice/RegisteredOffice';
import ShareHolders from './shareHolders/ShareHolders';

const CompanyMasterTabs = () => {

  return (
    <div className="tab-content-section">
      <TabView className="w-full">
      <TabPanel header="Currency" className="tabs">
          <Currency />
        </TabPanel>
        <TabPanel header="Address Dtls" className="tabs">
          <Address/>
        </TabPanel>
        <TabPanel header="Registered Office" className="tabs">
          <RegisteredOffice />
        </TabPanel>
        <TabPanel header="Corporate Dtls">
          <CorporateDtls />
        </TabPanel>
        <TabPanel header="Director Dtls">
          <DirectorDetails/>
        </TabPanel>
        <TabPanel header="License" className="tabs">
          <License />
        </TabPanel>
        <TabPanel header="Management" className="tabs">
          <Management />
        </TabPanel>
        <TabPanel header="Share holders" className="tabs">
          <ShareHolders />
        </TabPanel>
        <TabPanel header="Associates" className="tabs">
          <Associates />
        </TabPanel>
        <TabPanel header="Line of Business" className="tabs">
          <LineOfBusiness />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default CompanyMasterTabs;
