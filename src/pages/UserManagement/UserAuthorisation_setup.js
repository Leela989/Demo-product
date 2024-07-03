import React, { useState } from "react";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import { RadioButton } from "primereact/radiobutton";
import "./UserAuthorisationSetup.css";
import CustomButton from "../../components/Button/CustomButton";
import User_Authorisation_Attributes from "./User_Authorisation_Attributes";

function UserAuthorisation_setup() {
  const handleUserGroupChange = (e) => {
    // Handle user group change
  };

  const userGroup_options = [
    { name: "UWMA - UW Manager" },
    { name: "UWSO- UW Senior Officer" },
    { name: "UWJO- UW Junior officer" },
    { name: "ITUSER - IT user" },
    { name: "ADMIN - Admin" },
    { name: "CLMA" },
    { name: "CLSO" },
    { name: "CLJO" },
    { name: "RIMA" },
    { name: "RISO" },
    { name: "RIJO" },
  ];

  const [selectedCategory, setSelectedCategory] = useState({
    user: "All",
    company: "All",
    branch: "All",
    department: "All",
    lob: "All",
    product: "All",
  });

  const handleCategoryChange = (category, value) => {
    setSelectedCategory((prev) => ({ ...prev, [category]: value }));
  };

  const saveChanges = () => {};

  return (
    <div className="user-authorisation-setup">
      <div className="attributesHeader">
        <div className="w-4/4 p-2">
          <label className="radio_button_heading">User Group</label>
          <AutoCompleteField
            name="userGroup"
            className="mt-2"
            value={""}
            onChange={handleUserGroupChange}
            options={userGroup_options}
            dropdown
          />
        </div>

        <div className="flex mt-6">
          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">User</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryUser"
                  value="All"
                  onChange={(e) => handleCategoryChange("user", e.value)}
                  checked={selectedCategory.user === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryUser"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("user", e.value)}
                  checked={selectedCategory.user === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="user"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.user !== "Dropdown"}
                />
              </div>
            </div>
          </div>

          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">Company</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryCompany"
                  value="All"
                  onChange={(e) => handleCategoryChange("company", e.value)}
                  checked={selectedCategory.company === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryCompany"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("company", e.value)}
                  checked={selectedCategory.company === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="company"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.company !== "Dropdown"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">Branch</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryBranch"
                  value="All"
                  onChange={(e) => handleCategoryChange("branch", e.value)}
                  checked={selectedCategory.branch === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryBranch"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("branch", e.value)}
                  checked={selectedCategory.branch === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="branch"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.branch !== "Dropdown"}
                />
              </div>
            </div>
          </div>

          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">Department</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryDepartment"
                  value="All"
                  onChange={(e) => handleCategoryChange("department", e.value)}
                  checked={selectedCategory.department === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryDepartment"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("department", e.value)}
                  checked={selectedCategory.department === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="department"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.department !== "Dropdown"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">LOB</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryLob"
                  value="All"
                  onChange={(e) => handleCategoryChange("lob", e.value)}
                  checked={selectedCategory.lob === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryLob"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("lob", e.value)}
                  checked={selectedCategory.lob === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="lob"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.lob !== "Dropdown"}
                />
              </div>
            </div>
          </div>

          <div className="w-4/4 p-2 align-items-center">
            <div className="radio_button_heading">Product</div>
            <div className="radio-group">
              <div className="top_row">
                <RadioButton
                  name="userCategoryProduct"
                  value="All"
                  onChange={(e) => handleCategoryChange("product", e.value)}
                  checked={selectedCategory.product === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="bottom_row">
                <RadioButton
                  name="userCategoryProduct"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("product", e.value)}
                  checked={selectedCategory.product === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full ml-2"
                  name="product"
                  value={""}
                  label=""
                  onChange={() => {}}
                  options={userGroup_options}
                  dropdown
                  disabled={selectedCategory.product !== "Dropdown"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/4 mt-7 flex justify-center">
          <CustomButton label="Save" className="w-1/4" onClick={saveChanges} />
        </div>
      </div>

      <div className="attributesBox">
        <User_Authorisation_Attributes />
      </div>
    </div>
  );
}

export default UserAuthorisation_setup;
