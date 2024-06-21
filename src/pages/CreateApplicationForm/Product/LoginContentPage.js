import React, { useState, useRef, useEffect } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import "../Styles/DetailLoginPage.css";
import { TabView, TabPanel } from "primereact/tabview";
import InputField from "../../../components/InputField/InputField";
import AutoCompleField from '../../../components/AutoCompleteField/AutoCompleteField';  
import DiscountLoadings from "../Product/DiscountLoading/DiscountLoading";
import DateField from "../../../components/DateField/Datefield";
import CustomButton from '../../../components/Button/CustomButton';
import LanguageDescription from '../../../components/language-description/lang-desctiption';
import mandatory from '../../../assets/star-red-512.webp';
import { Toast } from 'primereact/toast';
import { useLocation } from "react-router";
import emptyData from './ProductHeaderEmptyData.json';
import { useParams } from 'react-router-dom';
import { Code, Language } from "@mui/icons-material";


export default function LoginContentPage({ data }) {
  const toast = useRef(null);
  const { id , key } = useParams();
  const productKey = parseInt(key, 10);
  const [activeIndex, setActiveIndex] = useState(1);
  const [showApprove, setShowApprove] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const [headerData, setHeaderData] = useState({});
  const [formData, setFormData] = useState({
    code: data[id]?.productHeaderDetails?.Code || "",
    description: data[id]?.productHeaderDetails?.Description || "",
    shortDescription: data[id]?.productHeaderDetails?.Short_description || "",
    lineOfBusiness: data[id]?.productHeaderDetails?.Line_of_Business || "",
    effectiveFrom: data[id]?.productHeaderDetails?.Effective_from || "",
    effectiveTo: data[id]?.productHeaderDetails?.Effective_to || "",
  });
  console.log(data, id, "helloWorld" );
  console.log("formData:", headerData[0]);

  const [langData, setLangData] = useState({
    default: "en",
    data: [
      { lang: "English", code: "en", description: formData.description },
      { lang: "Spanish", code: "es", description: "Descripción en español" },
    ],
  });

  const languageDescription1 = {
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Spanish", code: "es", description: "" },
    ],
  }



  const [shortLangData, setShortLangData] = useState({
    default: "en",
    data: [
      { code: "en", lang: "English", description: formData.shortDescription },
      { code: "es", lang: "Spanish", description: "Descripción en español" },
    ]
  });

  const items = [
    { label: "Product" },
    { label: "Risk" },
    { label: "Rating" },
    { label: "Rules" },
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

  const validateForm = () => {
    const { code, lineOfBusiness, effectiveFrom, effectiveTo } = formData;
    return code;
  };

  const onClickingSave = () => {
    if (validateForm()) {
      setShowApprove(false);
      showSuccess();
    } else {
      showMandatoryFill();
    }
  };

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Saved Successfully', life: 3000 });
  };

  const showMandatoryFill = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all the required details', life: 3000 });
  };



  const handleLangUpdate = (updatedLang) => {
    console.log("Updated Language Data:", updatedLang);
  };

 
  return (
    <div className="product-step">
      <Toast ref={toast} />
      <InputField
        className="w-1/4 p-1"
        name="code"
        label="Code"
        value={formData.code}
        onChange={handleInputChange}
        mandatory={true}
      />
      
      <LanguageDescription
      langDefault = {languageDescription1.default}
        langData={langData.data}
        labelName="Description"
        className="w-2/4 p-1"
        onLangUpdate={handleLangUpdate}
      />
      <LanguageDescription
      langDefault = {languageDescription1.default}
        langData={shortLangData.data}
        labelName="Short Description"
        className="w-1/4 p-1"
        onLangUpdate={handleLangUpdate}
      />
      <AutoCompleField
        className="w-1/4 p-1"
        name="lineOfBusiness"
        label="Line of Business"
        value={formData.lineOfBusiness}
        onChange={handleInputChange}
        options={list}
        dropdown
      />
      <DateField
        className="w-1/4 p-1"
        name="effectiveFrom"
        label="Effective From"
        value={(productKey && new Date())}
        onChange={handleInputChange}
      />
      <DateField
        className="w-1/4 p-1"
        name="effectiveTo"
        label="Effective To"
        value={formData.effectiveTo}
        onChange={handleInputChange}
      />

      <div className="w-1/4 flex align-center justify-end p-1">
        <CustomButton label={"Save"} className="custombtns me-1" onClick={onClickingSave} />
        <CustomButton label={"Approve"} className="" disabled={showApprove} />
      </div>
    </div>
  );
}
