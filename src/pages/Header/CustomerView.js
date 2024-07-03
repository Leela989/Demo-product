import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import Azentiologo from "../../assets/AzentioLogo.png";
import ProfilePhoto from "../../assets/profileLogo.png";
import EntityImg from "../../assets/EntityImg.png";
import manProfile from "../../assets/manProfile.avif";
import { TabView, TabPanel } from "primereact/tabview";
import "./Header.css";
import Dashboard from "./customerView/Dashboard";
import QuotationListing from "../Header/customerView/QuotationListing";
import Policies from "./customerView/Policies";
import Endorsement from "./customerView/Endorsement";
import Registered_claims from "./customerView/Registered_claims";
import RiPolicies from "./customerView/RiPolicies";
import RiClaims from "./customerView/RiClaims";

function CustomerView() {
  const dropdownOptions = [
    { label: "Customer/Isnured" },
    { label: "Customer" },
    { label: "Isnured" },
  ];

  const handledropDownLanguage = () => {};
  return (
    <div>
      <div className="oneInsuranceHeader">
        <div className="azentioImage">
          <img src={Azentiologo} alt="Azentiologo" className="azentiologo" />
          <div className="AzentioText">
            <p className="oneText">ONE</p>
            <p className="insuranceText">Insurance</p>
          </div>
        </div>
        <div className="centerContent">
          <div>
            <Dropdown
              value={""}
              options={dropdownOptions}
              onChange={(e) => handledropDownLanguage(e.value)}
              placeholder="Custom/Insured"
              optionLabel="label"
              className="w-full"
            />
          </div>
          <div className="searchContainer">
            <div className="p-inputgroup search-input header_search">
              <InputText
                placeholder="Search"
                className="searchBar"
                value={""}
              />
              <i className="pi pi-search" />
            </div>
          </div>
        </div>
        <div className="profileDetails">
          <div>
            <img
              src={ProfilePhoto}
              alt="ProfilePhoto"
              className="ProfilePhoto"
            />
          </div>
          <div className="ml-2">
            <div className="entityText">ENTITY</div>
            <div className="viewText">360 View</div>
          </div>
          <div className="ml-2">
            <img src={EntityImg} alt="EntityImg" className="EntityImg" />
          </div>
        </div>
      </div>
      <div className="profileDetails">
        <div className="entity_box">
          <div>
            <img src={manProfile} alt="manProfile" className="manProfile" />
          </div>
          <div className="entity_content">
            <div className="EntityOptions">
              <p className="entiy_main_text">Entity Name</p>
              <p className="entity_text">: Azentio</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Entity ID</p>
              <p className="entity_text">:C/00000680</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Group ID</p>
              <p className="entity_text">:Individual</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Unique ID</p>
              <p className="entity_text">:ABZ123456</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Customer</p>
              <p className="entity_text">:Individual</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">KYC Status</p>
              <p className="entity_text">:Not verified</p>
            </div>
          </div>
        </div>
        <div className="entity_box">
          <div className="entity_content">
            <div className="EntityOptions">
              <p className="entiy_main_text">Date of Birth</p>
              <p className="entity_text">: 04-07-1996</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Nationality</p>
              <p className="entity_text">: SUADI ARABIA</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Email ID</p>
              <p className="entity_text">: ss@gmail.com</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Mobile NO</p>
              <p className="entity_text">: 9876543210</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Occupation</p>
              <p className="entity_text">: Agriculture</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Entity Name</p>
              <p className="entity_text">: Muhammed</p>
            </div>
          </div>
        </div>
        <div className="entity_box">
          <div className="entity_content">
            <div className="EntityOptions">
              <p className="entiy_main_text">Credit Limit Allowed</p>
              <p className="entity_text">: </p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Credit Limit Utilised</p>
              <p className="entity_text">: </p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Credit days</p>
              <p className="entity_text">: 0.0</p>
            </div>
            <div className="EntityOptions">
              <p className="entiy_main_text">Score/Rating</p>
              <p className="entity_text">:</p>
            </div>
          </div>
        </div>
      </div>
      <div className="periodBox">
        <div className="tabView">
          <TabView activeIndex={0}>
            <TabPanel header="Dashboard">
              <div>
                <Dashboard/>
              </div>
            </TabPanel>
            <TabPanel header="Quotation Listing">
              <div>
                <QuotationListing/>
              </div>
            </TabPanel>
            <TabPanel header="Policies">
              <div>
                <Policies/>
              </div>
            </TabPanel>
            <TabPanel header="Endorsements">
              <div>
                <Endorsement/>
              </div>
            </TabPanel>
            <TabPanel header="Registered Claims">
              <div>
                <Registered_claims/>
              </div>
            </TabPanel>
 
            <TabPanel header="RI-Policies">
              <div>
                <RiPolicies/>
              </div>
            </TabPanel>
            <TabPanel header="RI-Claims">
              <div>
                <RiClaims/>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
