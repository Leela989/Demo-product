import React, { useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import "../Styles/DetailLoginPage.css";
import { TabView, TabPanel } from "primereact/tabview";
import InputField from "../../../components/InputField/InputField";
import AutoCompleField from '../../../components/AutoCompleteField/AutoCompleteField';  
import DiscountLoadings from "../Product/DiscountLoading/DiscountLoading";
import DateField from "../../../components/DateField/Datefield";
import  CustomButton  from '../../../components/Button/CustomButton';

export default function LoginContentPage() {
  const [activeItem, setActiveItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [showApprove, setShowApprove] = useState(true);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    shortDescription: "",
    lineOfBusiness: "",
    effectiveFrom: "",
    effectiveTo: "",
  });

  const items = [
    {
      label: "Product",
    },
    {
      label: "Risk",
    },
    {
      label: "Rating",
    },
    {
      label: "Rules",
    },
  ];

  const list = [
    { name: "10 Motor" },
    { name: "20 Fire" },
    { name: "30 Marine" },
    { name: "40 Engineering" },
    { name: "50 Miscellaneous and Accident" },
    { name: "60 Liability" },
    { name: "70 Bonds" },
    { name: "80 Aviation" },
    { name: "90 Package" },
    { name: "91 Agriculture" },
  ];

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onClickingSave = () => {
    setShowApprove(false);
  }

  const home = { icon: "pi pi-home", url: "https://primereact.org" };

  const handleItemClick = (event) => {
    setActiveItem(event.item);
  };

  return (
      <div className="product-step">
          <InputField
            className="w-1/4 p-1"
            name="Code"
            label="Code"
            // labelType="float"
            value={formData.code}
            onChange={handleInputChange}
          />

           <InputField
            className="w-2/4 p-1" 
            name="description"
            label="Description"
            // labelType="float"
            value={formData.description}
            onChange={handleInputChange}
          />
           <InputField
            className="w-1/4 p-1"
            name="shortDescription"
            label="Short Description"
            // labelType="float"
            value={formData.shortDescription}
            onChange={handleInputChange}
          />
            <AutoCompleField
            className="w-1/4 p-1"
            name="lineOfBusiness"
            label="Line of Business"
            // labelType="float"
            value={formData.lineOfBusiness}
            onChange={handleInputChange}
            options={list}
            dropdown
          />
            <DateField
            className="w-1/4 p-1"
            name="effectiveFrom"
            label="Effective From"
            // labelType="float"
            value={formData.effectiveFrom}
            onChange={handleInputChange}
          />
          <DateField
            className="w-1/4 p-1"
            name="effectiveTo"
            label="Effective To"
            // labelType="float"
            value={formData.effectiveTo}
            onChange={handleInputChange}
          />

          <div className="w-1/4 flex align-center justify-end p-1">
              <CustomButton label={"Save"} className="custombtns me-1" onClick={onClickingSave}/>
              <CustomButton label={"Approve"} className="" disabled={showApprove}/>
          </div>

        
      </div>
  );
}
