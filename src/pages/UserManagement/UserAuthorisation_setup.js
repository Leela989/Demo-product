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
    { name: "User group1" },
    { name: "User group2" },
    { name: "User group3" },
    { name: "User group4" },
    { name: "User group5" },
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
      <div className="flex flex-wrap">
        <div className="w-1/4 p-2">
          <label className="radio_button_heading">User Group</label>
          <AutoCompleteField
            name="userGroup"
            value={""}
            onChange={handleUserGroupChange}
            options={userGroup_options}
            dropdown
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">User</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="userCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("user", e.value)}
                  checked={selectedCategory.user === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="flex mt-4">
                <RadioButton
                  name="userCategory"
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
        </div>

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">Company</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="companyCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("company", e.value)}
                  checked={selectedCategory.company === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="flex mt-4">
                <RadioButton
                  name="companyCategory"
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

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">Branch</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="branchCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("branch", e.value)}
                  checked={selectedCategory.branch === "All"}
                />
                <label className="ml-2">All</label>
              </div>
              <div className="flex mt-4">
                <RadioButton
                  name="branchCategory"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("branch", e.value)}
                  checked={selectedCategory.branch === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full p-1"
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
        </div>

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">Department</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="departmentCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("department", e.value)}
                  checked={selectedCategory.department === "All"}
                />
                <label className="ml-2">All</label>
              </div>
              <div className="flex mt-4">
                <RadioButton
                  name="departmentCategory"
                  value="Dropdown"
                  onChange={(e) => handleCategoryChange("department", e.value)}
                  checked={selectedCategory.department === "Dropdown"}
                />
                <AutoCompleteField
                  className="w-full p-1"
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

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">LOB</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="lobCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("lob", e.value)}
                  checked={selectedCategory.lob === "All"}
                />
                <label className="ml-2">All</label>
              </div>

              <div className="flex mt-4">
                <RadioButton
                  name="lobCategory"
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
        </div>

        <div className="w-1/4 p-2">
          <label className="radio_button_heading">Product</label>
          <div className="radio-group">
            <div className="align-items-center">
              <div className="flex">
                <RadioButton
                  name="productCategory"
                  value="All"
                  onChange={(e) => handleCategoryChange("product", e.value)}
                  checked={selectedCategory.product === "All"}
                />
                <label className="ml-2">All</label>
              </div>
              <div className="flex mt-4">
                <RadioButton
                  name="productCategory"
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
        <div className="mt-21 ml-12" style={{marginTop: '70px'}}>
        <CustomButton label="Save" onClick={saveChanges} />
      </div>
      </div>
    
      <div className="mt-4">
        <User_Authorisation_Attributes />
      </div>
    </div>
  );
}

export default UserAuthorisation_setup;
