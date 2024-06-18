import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CheckBox from "../../components/CheckBox/CheckBox";
import DateField from "../../components/DateField/Datefield";
import InputField from "../../components/InputField/InputField";
import "./division.css";
import TabComponents from "./TabComponent";
import Division from "./division.json";

export default function Department() {
  const list = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({});

  const [key, setKey] = useState(0);

  const { id } = useParams();

  const [isApprove, setIsApproved] = useState(false);
  const [isFreeze, setIsFreeze] = useState(false);
  const [isPermanantFreeze, setIsPermanantFreeze] = useState(false);

  const handleInputChange = () => {};

  useEffect(() => {
    if (id) {
      const departmentData = Division.find(
        (department, index) => index.toString() === id
      );
      if (departmentData) {
        const department = departmentData.department || "";
        let arr = department.split("-");
        let code = arr[0];
        let name = arr[1];

        setFormData({
          ...departmentData,
          code,
          name,
        });
        setKey(key + 1);
      }
    }
  }, [id]);

  const setApproval = () => {
    formData.approvedBy = "User 1";
    setIsApproved(true);
    setKey(key + 1);
  };

  const setFreeze = () => {
    setIsFreeze(!isFreeze);
    formData.freezeBy = "User 1";
    setKey(key + 1);
  };

  const setPermanantFreeze = () => {
    setIsPermanantFreeze(!isPermanantFreeze);
    formData.freezeBy = "User 1";
    setKey(key + 1);
  };

  const branch_type = [
    { name: "01-Level 1" },
    { name: "02-Level 2" },
    { name: "03-Level 3" },
    { name: "04-Level 4" },
    { name: "05-Level 5" },
  ];
  const branch_code = [
    { name: "001-Chennai" },
    { name: "002-Hyderabad" },
    { name: "003-Kochi" },
    { name: "004-Mumbai" },
    { name: "005-Noida" },
  ];

  return (
    <div className="bg-scroll" key={key}>
      <div className="flex justify-between mb-3">
        <div className="heading">
          <h1>Division Details</h1>
        </div>
        <div>
          <Button
            rounded={false}
            label="Approve"
            onClick={() => setApproval()}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
          <Button
            rounded={false}
            label="Amend"
            //   onClick={(event) => menuLeft.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
          <Button
            rounded={false}
            label="Save"
            //   onClick={(event) => menuLeft.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
        </div>
      </div>
      <div className="flex">
        <InputField
          className="w-1/4 p-1"
          name="departmentCode"
          label="Division Code"
          value={formData.code}
          onChange={handleInputChange}
          mandatory={true}
        />
        <InputField
          className="w-1/4 p-1"
          name="departmentName"
          label="Division Name"
          value={formData.name}
          onChange={handleInputChange}
          mandatory={true}
        />
        <InputField
          className="w-1/4 p-1"
          name="shortName"
          label="Short Name"
          value={formData.shortName}
          onChange={handleInputChange}
          mandatory={true}
        />
        <AutoCompleteField
          className="w-1/4 p-1 pt-2"
          name="incharge"
          label="Incharge"
          value={formData.incharge}
          onChange={handleInputChange}
          options={list}
          dropdown
        />
      </div>
      <div className="flex mt-2">
        <AutoCompleteField
          className="w-1/4 p-1"
          name="freezeReason"
          label="Branch Type"
          value={formData.freezeReason}
          onChange={handleInputChange}
          options={branch_type}
          dropdown
        />
        <AutoCompleteField
          className="w-1/4 p-1"
          name="parentBranchType"
          label="Parent Branch Type"
          value={formData.parentBranchType}
          onChange={handleInputChange}
          options={branch_type}
          dropdown
        />
        <AutoCompleteField
          className="w-1/4 p-1"
          name="parentBranchCode"
          label="Parent Branch Code"
          value={formData.parentBranchCode}
          onChange={handleInputChange}
          options={branch_code}
          dropdown
        />

        <AutoCompleteField
          className="w-1/4 pl-1"
          name="hod"
          label="Head of the Division"
          value={formData.hod}
          onChange={handleInputChange}
          options={list}
          dropdown
        />
      </div>
      <div className="flex mt-2">
        <div className="w-1/4 pt-5 pl-1">
          <CheckBox
            labelName="Freeze"
            boxChecked={isFreeze || false}
            onChange={() => setFreeze()}
          />
        </div>
        <div className="w-1/4 pt-5">
          <CheckBox
            labelName="Permanent Freeze"
            boxChecked={isPermanantFreeze || false}
            onChange={() => setPermanantFreeze()}
          />
        </div>
        <InputField
          className="w-1/4 p-1"
          name="freezeReason"
          label="Freeze Reason"
          value={formData.freezeReason}
          onChange={handleInputChange}
          mandatory={(isFreeze || isPermanantFreeze) && true}
        />
        <InputField
          className="w-1/4 p-1"
          name="approvedBy"
          label="Approved By"
          value={formData.approvedBy}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <AutoCompleteField
          className="w-1/4 pt-1 pl-1"
          name="freezeBy"
          label="Freeze By"
          value={formData.freezeBy}
          onChange={handleInputChange}
          options={list}
          dropdown
        />

        <DateField
          className="w-1/4 ml-2 mt-2"
          name="dateOfFreeze"
          label="Date of Freeze"
          labelType="left"
          disabled
          value={(isFreeze || isPermanantFreeze) && new Date()}
          onChange={handleInputChange}
        />

        <InputField
          className="w-1/4 mt-1 pl-2"
          name="amendReason"
          label="Amend Reason"
          value={formData.amendReason}
          onChange={handleInputChange}
        />
        <DateField
          className="w-1/4 ml-2 mt-2"
          name="effectiveFrom"
          label="Date of Approve"
          labelType="left"
          disabled
          value={isApprove && new Date()}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-6">
        <TabComponents id={id} />
      </div>
    </div>
  );
}
