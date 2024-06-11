import React, { useState, useRef, useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import KebabMen from "../../../assets/kebab.svg";
import ratingStepData from "./ratingStep.json";
import "./RatingStep.css";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";
import DialogueBox from '../../../components/DialogueBox/DialogueBox.js';
import ListingPagedata from '../../ListingPage/ListingPageNew.json';
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useParams } from 'react-router-dom';
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";

function RatingStep() {
  const menuLeft = useRef(null);
  const options = [{ name: "edit" }, { name: "delete" }];
  const [productName_toDisplay, set_productName_toDisplay] = useState('');
  const [data, setData] = useState({});
  const [shortRatePopUp, setShortratePopup] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const fileInputRef = useRef(null);
  const [tableData, setTableData] = useState(ratingStepData);

  useEffect(() => {
    const matchingProduct = ListingPagedata.find((product) => product.key === productKey);
    if (matchingProduct) {
      set_productName_toDisplay(matchingProduct.name);
    }
  }, [productKey]);

  const coverDropdownValue = [
    { name: "1001- Own Damage" },
    { name: "2002- Accident" },
    { name: "3003- Issue in product" },
  ];

  const calculationLogicData = [
    { name: "SI*Rate/Rate Per" },
    { name: "CGS*Rate/Rate Per" },
  ];

  const handleInputChange = ({ name, value }) => {
    setData({ ...data, [name]: value });
  };

  const handleShortRateSetUp = () => {
    console.log('datay', ListingPagedata);
    setShortratePopup(true);
  }

  const tariffDataOptions = [
    { label: "View" },
    { label: "Delete" },
    { label: "Edit" },
    { label: "Save" }
  ]

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu
          model={tariffDataOptions}
          popup
          ref={menuLeft}
          id="popup_menu_left"
        />
        <Button
          rounded
          text
          icon="pi pi-ellipsis-v"
          onClick={(event) => menuLeft.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        />
      </div>
    );
  };

  const durationIndValues = [
    {name : 'Exceeding'},
    {name : 'Non Exceeding'}
  ]

  const durationTypeValues = [
    {name : 'Days'},
    {name : 'Weeks'},
    {name : 'Months'}
  ]



  const shortRateSetUp_popUp = () => {
    return (
      <div>
        <h1 className="text-#003B95">{`Product: ${productName_toDisplay}`}</h1>
        <div className="mt-4">
        <DataTable
            value={ratingStepData}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="id"
              header="id"
              body={(rowData) => (
                <InputField type="text" value={rowData.id} onChange={(e) => handleInputChange("id", e)}/>
              )}
            />
            <Column
              field="durationInd"
              header="Duration Ind."
              body={(rowData) => (
                <AutoCompleteField
            className="w-4/4"
            name="type"
            options={durationIndValues}
            dropdown
            value={data.durationInd}
            onChange={(e) => handleInputChange("durationInd", e.value)}
          />
              )}
            />
            <Column
              field="duration"
              header="Duration"
              value={data.duration}
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} onChange={(e) => handleInputChange("duration", e)}/>
              )}
            />
            <Column
              field="duration_type"
              header="Duration Type"
              body={(rowData) => (
                <AutoCompleteField
            className="w-4/4"
            name="type"
            options={durationTypeValues}
            dropdown
            value={data.duration_type}
            onChange={(e) => handleInputChange("duration_type", e.value)}
          />
              )}
            />
            <Column
              field="rate"
              header="Rate"
              body={(rowData) => (
                <InputField type="text" value={rowData.rate} onChange={(e) => handleInputChange("rate", e)}/>
              )}
            />
             <Column
              field="rate_per"
              header="Rate Per"
              body={(rowData) => (
                <InputField type="text" value={rowData.rate_per} onChange={(e) => handleInputChange("rate_per", e)} />
              )}
            />
          </DataTable>
        </div>

      </div>
    );
  }

  const handleClose = () => {
    setShortratePopup(false);
  }

  const handleSave = () => {
    setShortratePopup(false);
  }

  const handleAdd = () => {
    const newRow = [
      {
        "insurableProduct": ""
      }
    ]
    setTableData([...tableData,newRow])
  }

  const triggerFileInput = () => {
    fileInputRef.current.click();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  }

  const tableHeaderRender = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div style={{ display: 'flex' }}>
          <div className="mr-40 mt-5 text-blue-600 underline underline-offset-2 text-xl">
            <a href="#" onClick={triggerFileInput}>Upload Tariff data</a>
          </div>
          <div className="mr-40 mt-5 text-blue-600 underline underline-offset-2 text-xl">
            <a href="#" onClick={triggerFileInput}>Download</a>
          </div>
          <div>
            <CustomButton
              label="ADD"
              onClick={handleAdd}
              className="small-btn mt-4 -ml-16"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mt-4">
        <CustomButton label={'Short Rate Setup'} className="small-btn w-54" onClick={handleShortRateSetUp} />
      </div>
      <div className="tafiffParameters">
        <AutoCompleField
          className="w-1/4 p-1"
          name="cover"
          label="Cover"
          value={""}
          onChange={handleInputChange}
          options={coverDropdownValue}
          dropdown
        />
        <AutoCompleField
          className="w-1/4 p-1"
          name="calculationLogic"
          label="Calculation Logic"
          value={""}
          onChange={handleInputChange}
          options={calculationLogicData}
          dropdown
        />
        <InputField className="w-1/4 p-1" name="order" label="Order" />
        <AutoCompleField
          className="w-1/4 p-1"
          name="shortRateId"
          label="Short Rate Id"
          value={""}
          onChange={handleInputChange}
          options={calculationLogicData}
          dropdown
        />
      </div>
      <div className="tableContainer">
        <div style={{ display: "flex" }}>
          <DataTable
            value={tableData}
            header={"Tariff Parameters"}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="insurableProduct"
              header="Insurable Product"
              body={(rowData) => (
                <InputField type="text" value={rowData.insurableProduct} />
              )}
            />
            <Column
              field="parameter"
              header="Parameter"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="type"
              header="Type"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="source"
              header="Source"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} />
              )}
            />
            <Column
              field="action"
              header="Action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "5%" }}
            />
          </DataTable>
          <div>
            <CustomButton
              label="ADD"
              onClick={handleAdd}
              className="small-btn mt-4 -ml-16"
            />
          </div>
        </div>
      </div>

      <div></div>
      <div className="tableContainer">
        <div style={{ display: 'flex' }}>
          <DataTable
            value={ratingStepData}
            header={tableHeaderRender("Tariff data")}
            scrollable
            scrollHeight="200px"
          >
            <Column
              field="vehicleAgeFrom"
              header="Vehicle age from"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.insurableProduct}
                  disabled
                />
              )}
            />
            <Column
              field="vehicleAgeTo"
              header="Vehicle age to"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="make"
              header="Make"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="rate"
              header="Rate"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="ratePer"
              header="Rate Per"
              body={(rowData) => (
                <InputField type="text" value={rowData.riskType} disabled />
              )}
            />
            <Column
              field="action"
              header="Action"
              body={(rowData, { rowIndex }) =>
                actionBodyTemplate(rowData, rowIndex)
              }
              style={{ width: "5%" }}
            />
          </DataTable>
        </div>
      </div>
      {shortRatePopUp && 
      <DialogueBox
       header="Short Rate SetUp" 
       data={shortRateSetUp_popUp()}
       visible={shortRatePopUp}
       onSave={handleSave}
       onClose={handleClose}
       yesButtonText="Save"
       noButtonText="Cancel"
       />
       }
       <input type="file" ref={fileInputRef} style={{display: 'none'}} onChane={handleFileUpload}/>
    </div>
  );
}

export default RatingStep;
