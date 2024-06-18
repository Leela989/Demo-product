import { Button } from "primereact/button";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import InputField from "../../components/InputField/InputField";
import "./division.css";

export default function Address({ data }) {
  const cityList = [
    { name: "Chennai" },
    { name: "Coimbatore" },
    { name: "Hyderabad" },
  ];
  const countryList = [
    { name: "India" },
    { name: "Canada" },
    { name: "Russia" },
  ];
  const districtList = [
    { name: "Chennai" },
    { name: "Coimbatore" },
    { name: "Hyderabad" },
  ];

  const contactPersonList = [
    { name: "User 1" },
    { name: "User 2" },
    { name: "User 3" },
  ];

  return (
    <div>
      <div className="sub-heading">Address Details</div>
      <div>
        <div className="mb-3 flex">
          <InputField
            className="w-1/4 pt-1 pl-1"
            name="approvedBy"
            label="Address Code"
            // value={formData.code}
            // onChange={handleInputChange}
          />
          <AutoCompleteField
            className="w-1/4 pt-1 pl-2"
            name="incharge"
            label="City/Region"
            // value={formData.lineOfBusiness}
            // onChange={handleInputChange}
            options={cityList}
            dropdown
          />
          <AutoCompleteField
            className="w-1/4 pt-1 pl-2"
            name="incharge"
            label="Country"
            // value={formData.lineOfBusiness}
            // onChange={handleInputChange}
            options={countryList}
            dropdown
          />
          <AutoCompleteField
            className="w-1/4 pt-1 pl-2"
            name="incharge"
            label="District"
            // value={formData.lineOfBusiness}
            // onChange={handleInputChange}
            options={districtList}
            dropdown
          />
        </div>
        <div className="mb-3 flex">
          <AutoCompleteField
            className="w-1/4 p-1"
            name="incharge"
            label="Contact Person"
            // value={formData.lineOfBusiness}
            // onChange={handleInputChange}
            options={contactPersonList}
            dropdown
          />
          <InputField
            className="w-1/4 p-1"
            name="approvedBy"
            label="Address"
            // value={formData.code}
            // onChange={handleInputChange}
          />
          <InputField
            className="w-1/4 p-1"
            name="approvedBy"
            label="Address"
            // value={formData.code}
            // onChange={handleInputChange}
          />
          <InputField
            className="w-1/4 p-1"
            name="approvedBy"
            label="Phone No"
            // value={formData.code}
            // onChange={handleInputChange}
          />
        </div>
        <div className="flex">
          <InputField
            className="w-1/4 p-1"
            name="approvedBy"
            label="Email ID"
            // value={formData.code}
            // onChange={handleInputChange}
          />
          <InputField
            className="w-1/4 p-1"
            name="approvedBy"
            label="Mobile No"
            // value={formData.code}
            // onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <Button
            rounded={false}
            label="Save"
            //   onClick={(event) => menuLeft.current.toggle(event)}
            aria-controls="popup_menu_left"
            aria-haspopup
          />
        </div>
      </div>
    </div>
  );
}
