import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import InputField from "../../../components/InputField/InputField";
import "../CompanyMaster.css";
import CustomButton from "../../../components/Button/CustomButton";

function Address() {
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
            name="address5"
            label="Address5"
            value={formData.address5}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="mobile"
            label="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="contactPerson"
            label="Contact Person"
            value={formData.contactPerson}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="state"
            label="State"
            value={formData.state}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="postalZip"
            label="Postal Zip"
            value={formData.postalZip}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputField
            className="w-1/3"
            name="province"
            label="Province"
            value={formData.province}
            onChange={handleInputChange}
          />
          <InputField
            className="w-1/3 ml-3"
            name="fax"
            label="Fax"
            value={formData.fax}
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
        <div className="flex justify-center mt-3">
          <CustomButton label="SAVE"/>
        </div>
      </div>
    </div>
  );
}

export default Address;
