import React, { useState, useRef, useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ratingStepData from "./ratingStep.json";
import "./RatingStep.css";
import AutoCompleField from "../../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../../components/Button/CustomButton";
import DialogueBox from "../../../components/DialogueBox/DialogueBox.js";
import ListingPagedata from "../../ListingPage/ListingPageNew.json";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useParams } from "react-router-dom";
import { Accordion, AccordionTab } from "primereact/accordion";
import AutoCompleteField from "../../../components/AutoCompleteField/AutoCompleteField";
import productData from "../../ListingPage/ListingPageNew.json";
import { Toast } from "primereact/toast";

function RatingStep() {
  const menuLeft = useRef(null);
  const toast = useRef(null);
  // const parameters = ratingStepData.data[0].Tariff_parameters[0].Parameters;
  const tariff_data_column_details =
    ratingStepData.data[0].Tariff_data_table_details[0].Tariff_columns;
  const [tariff_data_column_data, set_tariff_data_column_data] = useState(
    ratingStepData.data[0].Tariff_data_table_details[0].Tariff_data
  );

  const [parameters, set_parameters] = useState(
    ratingStepData.data[0].Tariff_parameters[0].Parameters
  );
  const short_rate_setup_data =
    ratingStepData.data[0].Tariff_data_table_details[0].short_rate_setup;
  const options = [{ label: "Edit" }, { label: "Delete" }];
  const [productName_toDisplay, set_productName_toDisplay] = useState("");
  const [data, setData] = useState({});
  const [shortRatePopUp, setShortratePopup] = useState(false);
  const { id, key } = useParams();
  const productKey = parseInt(key, 10);
  const fileInputRef = useRef(null);
  const [tableData, setTableData] = useState(ratingStepData);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [tariffDataColumns, setTariffDataColumns] = useState([]);
  const [cover_data, set_cover_data] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editing_parameter_rowIndex, set_editing_parameter_rowIndex] =
    useState(null);

  const [unique_key, setKey] = useState(0);
  const handleParameterSelection = (e) => {
    setSelectedParameter(e.value);
    console.log("sel", e.value);
    if (e.value && e.value.Para_Type === "Slab") {
      setTariffDataColumns([
        {
          field: `${e.value.Field_Name} From`,
          header: `${e.value.Field_Name} From`,
        },
        {
          field: `${e.value.Field_Name} To`,
          header: `${e.value.Field_Name} To`,
        },
      ]);
    } else {
      setTariffDataColumns([
        { field: `${e.value.Field_Name}`, header: `${e.value.Field_Name}` },
      ]);
    }
  };
  const [formData, setFormData] = useState({
    type: "",
    codeDescription: "",
    cover: "",
    sort_order: "",
    calculation_logic: "",
    short_rate_id: "",
    rate: "",
    rate_per: "",
  });

  useEffect(() => {
    const filteredProduct = productData.find((product) => product.key === 2301);
    console.log("filteredData_product", filteredProduct);

    if (filteredProduct) {
      const coversData = filteredProduct.data[0].Covers.map((item) => ({
        type: item.Type,
        codeDescription: `${item.Code} - ${item.Description}`,
        sort_order: item.Sort_order,
        calculation_logic: item.calculation_logic,
        short_rate_id: item.short_rate_id,
        rate: item.rate,
        rate_per: item.rate_per,
      }));

      const discountData = filteredProduct.data[0].Discount.map((item) => ({
        type: item.Type,
        codeDescription: `${item.Code} - ${item.Description}`,
        sort_order: item.Sort_order,
        calculation_logic: item.calculation_logic,
        short_rate_id: item.short_rate_id,
        rate: item.rate,
        rate_per: item.rate_per,
      }));

      const firstRecord = [...coversData, ...discountData][0];
      setFormData({
        type: firstRecord.type,
        codeDescription: firstRecord.codeDescription,
        sort_order: firstRecord.sort_order,
        calculation_logic: firstRecord.calculation_logic || "",
        short_rate_id: firstRecord.short_rate_id || "",
        rate: firstRecord.rate,
        rate_per: firstRecord.rate_per,
      });
      setKey(unique_key + 1);
      console.log("firstRecord", firstRecord);

      set_cover_data([...coversData, ...discountData]);
    }
  }, []);

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        ...formData,
        type: selectedRow.type,
        codeDescription: selectedRow.codeDescription,
        sort_order: selectedRow.sort_order,
        calculation_logic: selectedRow.calculation_logic,
        short_rate_id: selectedRow.short_rate_id,
        rate: selectedRow.rate,
        rate_per: selectedRow.rate_per,
      });
    }
  }, [selectedRow, formData]);

  const handleInputChange = (fieldName, value) => {
    setData({ ...data, [fieldName]: value });
  };

  const handleShortRateSetUp = () => {
    console.log("short_rate_setup_data", short_rate_setup_data);
    setShortratePopup(true);
  };

  const durationIndValues = [{ name: "Exceeding" }, { name: "Non Exceeding" }];

  const durationTypeValues = [
    { name: "Days" },
    { name: "Weeks" },
    { name: "Months" },
  ];

  const actionBodyTemplate = (rowData, rowIndex) => {
    return (
      <div className="kebab-menu-container">
        <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
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

  const coverDropdownValue = [
    { name: "1001- Own Damage" },
    { name: "2002- Accident" },
    { name: "3003- Issue in product" },
  ];

  const calculationLogicData = [
    { name: "SI*Rate/Rate Per" },
    { name: "Fixed" },
    { name: "Custom1" },
  ];

  const parameterOptions = [
    { name: "Vehicle Details" },
    { name: "Driver Details" },
    { name: "Geographical Extensions" },
  ];

  const parameterTypeOptions = [{ name: "Equals" }, { name: "Slab" }];

  const shortRateSetUp_popUp = () => {
    return (
      <div>
        <h1 className="text-#003B95">{`Product: ${productName_toDisplay}`}</h1>
        <div className="mt-4">
          <DataTable
            value={short_rate_setup_data}
            scrollable
            scrollHeight="200px"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column
              field="id"
              header="id"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                />
              )}
            />
            <Column
              field="durationInd"
              header="Duration Ind."
              body={(rowData) => (
                <AutoCompleteField
                  className="w-4/4"
                  name="durationInd"
                  options={durationIndValues}
                  dropdown
                  value={rowData.duration_ind}
                  onChange={(e) => handleInputChange("durationInd", e.value)}
                />
              )}
            />
            <Column
              field="duration"
              header="Duration"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              )}
            />
            <Column
              field="duration_type"
              header="Duration Type"
              body={(rowData) => (
                <AutoCompleteField
                  className="w-4/4"
                  name="duration_type"
                  options={durationTypeValues}
                  dropdown
                  value={rowData.duration_type}
                  onChange={(e) => handleInputChange("duration_type", e.value)}
                />
              )}
            />
            <Column
              field="rate"
              header="Rate"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.rate}
                  onChange={(e) => handleInputChange("rate", e.target.value)}
                />
              )}
            />
            <Column
              field="rate_per"
              header="Rate Per"
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.rate_per}
                  onChange={(e) =>
                    handleInputChange("rate_per", e.target.value)
                  }
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setShortratePopup(false);
  };

  const handleSave = () => {
    setShortratePopup(false);
  };

  const handleAdd = () => {
    const newRow = {
      usage_type: "",
      body_type: "",
      seating_capacity_from: "",
      seating_capacity_to: "",
      gross_vehicle_weight: "",
      rate: "",
      rate_per: "",
    };
    setTableData({
      ...tableData,
      data: [
        ...tableData.data,
        {
          Tariff_data_table_details: [
            {
              Tariff_data: [...tariff_data_column_data, newRow],
            },
          ],
        },
      ],
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  };

  const handle_tariff_data_Add = () => {
    const newRow = [
      {
        usage_type: "",
        body_type: "",
        seating_capacity_from: "",
        seating_capacity_to: "",
        gross_vehicle_weight: "",
        rate: "",
        rate_per: "",
      },
    ];
    set_tariff_data_column_data([...tariff_data_column_data, newRow]);
    setEditingRowIndex(tariff_data_column_data.length);
  };

  const tableHeaderRender = () => {
    return (
      <div className="">
        <div className="flex justify-end">
          <div className="mr-40 mt-5 text-blue-600 underline underline-offset-2 text-xl">
            <a href="#" onClick={triggerFileInput}>
              Upload Tariff data
            </a>
          </div>
          <div className="mr-40 mt-5 text-blue-600 underline underline-offset-2 text-xl">
            <a href="#" onClick={triggerFileInput}>
              Download
            </a>
          </div>
          <div>
            <CustomButton
              label="+ADD"
              onClick={handle_tariff_data_Add}
              className="small-btn mt-4 -ml-16"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleRowSelect = (rowData, rowIndex) => {
    const selectedRowData = rowData;
    setSelectedRow(selectedRowData);
    if (selectedRowData) {
      setFormData({
        ...formData,
        type: selectedRowData.type,
        codeDescription: selectedRowData.codeDescription,
        sort_order: selectedRowData.sort_order,
        calculation_logic: selectedRowData.calculation_logic,
        short_rate_id: selectedRowData.short_rate_id,
        rate: selectedRowData.rate,
        rate_per: selectedRowData.rate_per,
      });
    }
    let curKey = unique_key + 1;
    setKey(curKey);
  };

  const usage_type_options = [
    { name: "001-Private Car" },
    { name: "002-Commercial" },
    { name: "003-Rent a Car" },
    { name: "004-Taxi (Private or Public)" },
    { name: "005-Carrage of Own goods" },
    { name: "006-Carriage of Goods (Hire)" },
    { name: "007-Aggri Vehicle/Special Type" },
    { name: "008-Public Services" },
    { name: "009-Motor Cycle" },
    { name: "010-Motor Treaders" },
  ];

  const body_type_options = [
    { name: "10101A-SUV" },
    { name: "10101B-HATCHBACK" },
    { name: "10101C-TRUCK WITH BOX" },
    { name: "10101D-GARBAGE TRUCK" },
  ];

  const get_column_body_options = (fieldType) => {
    switch (fieldType) {
      case "usage_type":
        return usage_type_options;
      case "body_type":
        return body_type_options;
    }
  };

  const renderColumnBody = (rowData, column, options) => {
    const fieldType = column.field;
    const fieldValue = rowData[column.field_type];

    if (fieldType === "dropdown") {
      return (
        <AutoCompleteField
          className="w-4/4"
          name={column.field_type}
          value={fieldValue}
          onChange={(e) => handleInputChange(column.field_type, e.value)}
          options={get_column_body_options(column.field_type)}
          dropdown
          disabled={editingRowIndex !== options.rowIndex}
        />
      );
    } else {
      return (
        <InputField
          type="text"
          value={fieldValue}
          onChange={(e) => handleInputChange(column.field_type, e.target.value)}
          disabled={editingRowIndex !== options.rowIndex}
        />
      );
    }
  };

  const typeOptions = [
    { name: "Discount" },
    { name: "Loading" },
    { name: "Cover" },
  ];

  const short_rate_id_options = [
    { name: "Set1" },
    { name: "Set2" },
    { name: "Set3" },
  ];
  const renderEditSaveButton = (rowData, rowIndex) => {
    return (
      <i
        className="pi pi-pencil"
        style={{ fontSize: "1rem", color: "#003B95", cursor: "pointer" }}
        onClick={() => handleRowSelect(rowData, rowIndex)}
      ></i>
    );
  };

  const onSave = () => {
    setEditingRowIndex(null);
  };

  const onSave_tariff_parameter = () => {
    set_editing_parameter_rowIndex(null);
  }

  const onCancel_tariff_parameter = () => {
    set_editing_parameter_rowIndex(null);
  }

  const onCancel = () => {
    setEditingRowIndex(null);
  };

  const render_Edit_Save_Button = (rowIndex) => {
    if (editingRowIndex === rowIndex) {
      return (
        <div className="flex ml-2">
          <div>
            <i
              className="pi pi-check"
              style={{
                fontSize: "1rem",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
                backgroundColor: "rgb(30 211 30 / 79%)",
                color: "white",
              }}
              onClick={onSave}
            ></i>
          </div>
          <div className="ml-5">
            <i
              className="pi pi-times"
              style={{
                fontSize: "1rem",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={onCancel}
            ></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const render_Edit_Save_paramter_Button = (rowIndex) => {
    if (editing_parameter_rowIndex === rowIndex) {
      return (
        <div className="flex ml-2">
          <div>
            <i
              className="pi pi-check"
              style={{
                fontSize: "1rem",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
                backgroundColor: "rgb(30 211 30 / 79%)",
                color: "white",
              }}
              onClick={onSave_tariff_parameter}
            ></i>
          </div>
          <div className="ml-5">
            <i
              className="pi pi-times"
              style={{
                fontSize: "1rem",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={onCancel_tariff_parameter}
            ></i>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };



  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const handle_rating_header_save = () => {
    showSuccess();
  };

  const handle_tariff_parameters_Add = () => {
    const newRow = {
      Field_Id: "",
      Field_Name: "",
      Para_Type: "",
      Source: "",
    };
    set_parameters([...parameters, newRow]);
    set_editing_parameter_rowIndex(parameters.length);
  };

  const handle_tariff_parameter_add = (header) => {
    return (
      <div className="flex justify-between items-center">
        <p>{header}</p>
        <div style={{ display: "flex" }}>
          <CustomButton
            label="+Add"
            onClick={handle_tariff_parameters_Add}
            className="small-btn mt-4 -ml-16"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="flex justify-end mt-4">
        <CustomButton
          label={"Short Rate Setup"}
          className="small-btn w-54"
          onClick={handleShortRateSetUp}
        />
      </div>
      <div className="flex" key={unique_key}>
        <div className="ratingHeader">
          <div className="flex">
            <AutoCompleField
              className="w-1/4 p-1"
              name="type"
              label="Type"
              value={formData.type}
              onChange={handleInputChange}
              options={typeOptions}
              dropdown
            />

            <AutoCompleteField
              className="w-4/4"
              name="cover"
              options={coverDropdownValue}
              dropdown
              value={formData.codeDescription}
              label="Cover"
              onChange={(e) => handleInputChange("cover", e.value)}
            />
            <AutoCompleField
              className="w-1/4 p-1"
              name="calculationLogic"
              label="Calculation Logic"
              value={formData.calculation_logic}
              onChange={handleInputChange}
              options={calculationLogicData}
              dropdown
            />

            <AutoCompleField
              className="w-1/3 p-1"
              name="shortRateId"
              label="Short Rate Id"
              value={formData.short_rate_id}
              onChange={handleInputChange}
              options={short_rate_id_options}
              dropdown
            />
          </div>

          <div className="flex">
            <div className="w-1/3 p-1">
              <InputField
                name="order"
                label="Order"
                value={formData.sort_order}
              />
            </div>
            <div className="w-1/3 p-1">
              <InputField name="rate" label="Rate" value={formData.rate} />
            </div>
            <div className="w-1/3 p-1">
              <InputField
                name="rate_per"
                label="Rate Per"
                value={formData.rate_per}
              />
            </div>
            <div className="w-1/3">
              <CustomButton
                label="Save"
                className="w-32 ml-8 mt-6"
                onClick={handle_rating_header_save}
              />
            </div>
          </div>
          <div className="table_tariff_Container">
            <div style={{ display: "flex" }}>
              <DataTable
                value={key == 2301 && parameters}
                header={handle_tariff_parameter_add("Tariff Parameters")}
                scrollable
                scrollHeight="200px"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                selectionMode="single"
                selection={selectedParameter}
                onSelectionChange={handleParameterSelection}
              >
                <Column
                  field="parameter"
                  header="Parameter"
                  body={(rowData, options) => (
                    <AutoCompleteField
                      name="parameter"
                      value={rowData.Field_Name}
                      onChange={handleInputChange}
                      options={parameterOptions}
                      dropdown
                      disabled={editing_parameter_rowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="type"
                  header="Type"
                  body={(rowData, options) => (
                    <AutoCompleField
                      name="type"
                      value={rowData.Para_Type}
                      onChange={handleInputChange}
                      options={parameterTypeOptions}
                      dropdown
                      disabled={editing_parameter_rowIndex !== options.rowIndex}
                    />
                  )}
                />
                <Column
                  field="source"
                  header="Source"
                  body={(rowData, options) => (
                    <InputField
                      type="text"
                      value={rowData.Source}
                      disabled={editing_parameter_rowIndex !== options.rowIndex}
                    />
                  )}
                />
                  <Column
              field="action"
              className="w-5"
              body={(rowData, options) =>
                render_Edit_Save_paramter_Button(options.rowIndex)
              }
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
        </div>

        <div className="cover_card ml-4">
          <DataTable
            value={cover_data}
            scrollable
            scrollHeight="200px"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column
              field="type"
              header="Type"
              style={{ width: "35%" }}
              body={(rowData) => (
                <InputField
                  type="text"
                  value={rowData.type}
                  onChange={(value) => handleInputChange("id", value)}
                  disabled
                />
              )}
            />
            <Column
              field="codeDescription"
              header="Cover Code"
              style={{ width: "55%" }}
              body={(rowData) => (
                <AutoCompleteField
                  className="w-4/4"
                  name="codeDescription"
                  options={durationIndValues}
                  dropdown
                  value={rowData.codeDescription}
                  onChange={(e) => handleInputChange("durationInd", e.value)}
                  disabled
                />
              )}
            />
            <Column
              field="action"
              className="w-5"
              body={(rowData, options) =>
                renderEditSaveButton(rowData, options.rowIndex)
              }
            />
          </DataTable>
        </div>
        <div></div>
      </div>

      <Accordion multiple className="mt-5">
        <AccordionTab header="Tariff data">
          <DataTable
            value={key == 2301 && tariff_data_column_data}
            header={tableHeaderRender}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            scrollable
            scrollHeight="200px"
          >
            {tariff_data_column_details.map((column, index) => (
              <Column
                key={index}
                field={column.field_type}
                header={column.Column}
                body={(rowData, options) =>
                  renderColumnBody(rowData, column, options)
                }
              />
            ))}
            <Column
              field="action"
              className="w-5"
              body={(rowData, options) =>
                render_Edit_Save_Button(options.rowIndex)
              }
            />
            <Column
              field="action"
              header="Action"
              body={actionBodyTemplate}
              style={{ width: "5%" }}
            />
          </DataTable>
        </AccordionTab>
      </Accordion>
      {shortRatePopUp && (
        <DialogueBox
          header="Short Rate SetUp"
          data={shortRateSetUp_popUp()}
          visible={shortRatePopUp}
          onSave={handleSave}
          onClose={handleClose}
          yesButtonText="Save"
          noButtonText="Cancel"
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
}

export default RatingStep;
