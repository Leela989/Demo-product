import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../../components/InputField/InputField";
import "../CompanyMaster.css";
import CustomButton from "../../../components/Button/CustomButton";

function CorporateDtls() {
  const [formData, setformData] = useState({});
  const handleInputChange = () => {};
  return (
    <div>
      <div className="currencyTable">
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="address1"
            label="Address1"
            value={formData.address1}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="address2"
            label="Address2"
            value={formData.address2}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="address3"
            label="Address3"
            value={formData.address3}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="address4"
            label="Address4"
            value={formData.address4}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="postalZip"
            label="Postal Zip"
            value={formData.postalZip}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="telephone"
            label="Telehone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
        <InputField
            className="w-1/3 ml-3"
            name="fax"
            label="Fax"
            value={formData.fax}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="webSite"
            label="Website"
            value={formData.webSite}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-3">
          <CustomButton label="SAVE"/>
        </div>
      </div>
    </div>
  );
}

export default CorporateDtls;
