import React, { useEffect, useRef, useState } from "react";
import AutoCompleteField from "../../components/AutoCompleteField/AutoCompleteField";
import CustomButton from "../../components/Button/CustomButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import DateField from "../../components/DateField/Datefield";
import InputField from "../../components/InputField/InputField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import data from './CustomerCategory.json';

function CustomerCategory() {
    const menuLeft = useRef(null);
    const [categoryCode, setCategoryCode] = useState("");
    const [description, setDescription] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [entityType, setEntityType] = useState("");
    const [effectiveFrom, setEffectiveFrom] = useState(null);
    const [effectiveTo, setEffectiveTo] = useState(null);

    const onClickingSave = () => {};
    const handleInputChange = () => {};

    const list = [{ name: "Option1" }];
    const options = [{ name: "Option1" }];

    const cellInput = (val, typeofField) => {
        return <InputField type={typeofField} value={val} disabled />;
    };

    useEffect(() => {
        console.log('data.applicable_roles', data.applicable_roles);
    }, [])

 

    const cellAutoComplete = (val) => {
        return (
            <AutoCompleteField
                className="w-1/1"
                name="type"
                dropdown
                value={val}
                onChange={(e) => handleChange("type", e.value)}
                disabled
            />
        );
    };

    const handleChange = () => {};

    const actionBodyTemplate = (rowData, rowIndex) => {
        return (
            <div className="kebab-menu-container">
                <Menu model={options} popup ref={menuLeft} id="popup_menu_left" />
                <Button
                    text
                    rounded
                    className="action-menu"
                    icon="pi pi-ellipsis-v"
                    onClick={(event) => menuLeft.current.toggle(event)}
                    aria-controls="popup_menu_left"
                    aria-haspopup
                />
            </div>
        );
    };

    const render_charge_header = (header) => {
        return (
            <div className="flex justify-between items-center">
            <p>{header}</p>
            <div style={{ display: "flex" }}>
              <CustomButton
                label="+Add"
                onClick={''}
                className="small-btn mt-4 -ml-16"
              />
            </div>
          </div>
        );
    };

    const cellCheckBox = (val) => {
        return <CheckBox type="checkbox" checked={val} disabled />;
      };

    return (
        <div>
            <div>
                <div>
                    <h1 className="customer_category_heading">Customer Category</h1>
                </div>
                <div className="flex mt-4">
                    <InputField
                        className="w-1/4 p-1"
                        name="category_code"
                        label="Category Code"
                        value={categoryCode}
                        onChange={(e) => setCategoryCode(e.target.value)}
                        mandatory={true}
                    />
                    <InputField
                        className="w-1/4 p-1"
                        name="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        mandatory={true}
                    />
                    <InputField
                        className="w-1/4 p-1"
                        name="short_description"
                        label="Short Description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        mandatory={true}
                    />
                    <AutoCompleteField
                        className="w-1/4 p-1"
                        name="entity_type"
                        label="Entity Type"
                        value={entityType}
                        onChange={(e) => setEntityType(e.value)}
                        options={list}
                        dropdown
                    />
                </div>
                <div className="flex mt-6">
                    <div className="w-1/4">
                        <CheckBox labelName="Prospect YN" />
                    </div>
                    <div className="w-1/4">
                        <CheckBox labelName="Tax Details Req.YN" />
                    </div>
                    <div className="w-1/4">
                        <CheckBox labelName="Customer Auto Gen" />
                    </div>
                    <div className="w-1/4">
                        <CheckBox labelName="Prefix Applicable YN" />
                    </div>
                </div>
                <div className="flex mt-6">
                    <InputField
                        className="w-1/4 k-2"
                        name="prefix"
                        label="Prefix"
                        value={""}
                        onChange={handleInputChange}
                        mandatory={true}
                    />
                    <DateField
                        className="w-1/4 p-1"
                        name="effectiveFrom"
                        label="Effective From"
                        value={effectiveFrom}
                        onChange={(e) => setEffectiveFrom(e.target.value)}
                    />
                    <DateField
                        className="w-1/4 p-1"
                        name="effectiveTo"
                        label="Effective To"
                        value={effectiveTo}
                        onChange={(e) => setEffectiveTo(e.target.value)}
                    />

                    <div className="w-1/4 flex align-center justify-end mt-4">
                        <CustomButton
                            label={"Approve"}
                            className=""
                            onClick={onClickingSave}
                        />
                        <CustomButton
                            label={"Amend"}
                            className="custombtns ml-1"
                            onClick={onClickingSave}
                        />
                        <CustomButton
                            label={"Save"}
                            className="custombtns ml-1"
                            onClick={onClickingSave}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <DataTable
                        value={data.Account_details}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        header={render_charge_header('Account Details')}
                    >
                        <Column
                            header="Company"
                            field="company"
                            body={(rowData) => cellAutoComplete(rowData.company)}
                        />
                         <Column
                            header="Control A/c"
                            field="control_ac"
                            body={(rowData) => cellInput(rowData.control_ac, "text")}
                        />
                        <Column
                            header="Effective from"
                            field="effective_from"
                            body={(rowData) => (
                                <DateField
                                className="w-4/4 p-1"
                                name="effective_from"
                                value={new Date()}
                                onChange={(e) => {}}
                                disabled
                            />
                            )}
                        />
                         <Column
                            header="Effective to"
                            field="effective_to"
                            body={(rowData) => (
                                <DateField
                                className="w-4/4 p-1"
                                name="effective_to"
                                value={''}
                                onChange={(e) => {}}
                                disabled
                            />
                            )}
                        />
                        <Column
                            body={(rowData, { rowIndex }) =>
                                actionBodyTemplate(rowData, rowIndex)
                            }
                            style={{ width: "5%" }}
                        />
                    </DataTable>
                </div>
                <div className="mt-5">
                    <DataTable
                        value={data.applicable_roles}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        header={render_charge_header('Applicable Roles')}
                    >
                        <Column
                            header="Roles"
                            body={(rowData) => cellAutoComplete(rowData.roles)}
                        />
                        
                        <Column
                            header="Effective from"
                            body={(rowData) => (
                                <DateField
                                className="w-4/4 p-1"
                                name="effective_from"
                                value={new Date()}
                                onChange={(e) => {}}
                                disabled
                            />
                            )}
                        />
                         <Column
                            header="Effective to"
                            body={(rowData) => (
                                <DateField
                                className="w-4/4 p-1"
                                name="effective_to"
                                value={''}
                                onChange={(e) => {}}
                                disabled
                            />
                            )}
                        />
                        <Column
                            body={(rowData, { rowIndex }) =>
                                actionBodyTemplate(rowData, rowIndex)
                            }
                            style={{ width: "5%" }}
                        />
                    </DataTable>
                </div>
                <div className="mt-5">
                    <DataTable
                        value={data.applicable_taxes}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        header={render_charge_header('Applicable Taxes')}
                    >
                        <Column
                            header="Tax Category"
                            body={(rowData) => cellAutoComplete(rowData.tax_category)}
                        />
                        
                        
                         <Column
                            header="Default YN"
                                body={(rowData) => (cellCheckBox(rowData.default_tn))}
                        />
                        <Column
                            body={(rowData, { rowIndex }) =>
                                actionBodyTemplate(rowData, rowIndex)
                            }
                            style={{ width: "5%" }}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default CustomerCategory;
