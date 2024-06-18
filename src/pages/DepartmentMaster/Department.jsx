import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CheckBox from "../../components/CheckBox/CheckBox";
import DateField from "../../components/DateField/Datefield";
import InputField from "../../components/InputField/InputField";
import Departments from "./departments.json";

export default function Department() {
  const list = [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }];
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({});

  const [key, setKey] = useState(0);

  const { id } = useParams();

  const [isApprove, setIsApproved] = useState(false);
  const [isFreeze, setIsFreeze] = useState(false);
  const [isPermanantFreeze, setIsPermanantFreeze] = useState(false);

  useEffect(() => {
    if (id) {
      const departmentData = Departments.find(
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

  const handleChange = (e) => {};

  return (
    <div key={key}>
      <div className="heading">
        <h1>Department Details</h1>
      </div>
      <div className="flex">
        <InputField
          className="w-1/4 p-1"
          name="code"
          label="Department Code"
          value={formData.code || ""}
          onChange={handleChange}
          mandatory={true}
        />
        <InputField
          className="w-1/4 p-1"
          name="name"
          label="Department Name"
          value={formData.name}
          onChange={handleChange}
          mandatory={true}
        />
        <InputField
          className="w-1/4 p-1"
          name="shortName"
          label="Short Name"
          value={formData.shortName}
          onChange={handleChange}
          mandatory={true}
        />
        <AutoCompleteField
          className="w-1/4 p-1 pt-2"
          name="incharge"
          label="Incharge"
          value={formData.incharge}
          onChange={handleChange}
          options={list}
          dropdown
        />
      </div>
      <div className="flex mt-2">
        <div className="w-1/4 pt-5">
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
          value={formData.freezeReason || ""}
          onChange={handleChange}
          mandatory={(isFreeze || isPermanantFreeze) && true}
        />
        <InputField
          className="w-1/4 p-1"
          name="approvedBy"
          label="Approved By"
          value={formData.approvedBy || ""}
          onChange={handleChange}
          // mandatory={true}
        />
      </div>
      <div className="flex mt-2">
        <AutoCompleteField
          className="w-1/4 pt-1"
          name="freezeBy"
          label="Freeze By"
          value={formData.freezeBy}
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <InputField
          className="w-1/4 mt-1 pl-2"
          name="amendReason"
          label="Amend Reason"
          value={formData.amendReason}
          onChange={handleChange}
          // mandatory={true}
        />
        <DateField
          className="w-1/4 ml-2 mt-2"
          name="dateOfApprove"
          label="Date of Approve"
          labelType="left"
          disabled
          value={isApprove && new Date()}
          onChange={handleChange}
        />
      </div>
      <div className="flex mt-2">
        <AutoCompleteField
          className="w-1/4 pt-1"
          name="hod"
          label="Head of the Department"
          // value={formData.lineOfBusiness}
          onChange={handleChange}
          options={list}
          dropdown
        />
      </div>
      <div className="flex justify-end">
        <Button
          rounded={false}
          label="Approve"
          //   onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          onClick={() => setApproval()}
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
  );
}
