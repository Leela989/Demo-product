import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import {
  commissionData,
  installmentData,
  installmentHeader,
  premiumData,
} from "../../../mock-data/underwriting/premium-summary";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Margin } from "@mui/icons-material";
import { Card } from "primereact/card";
import CustomTable from "../../../components/CustomTable/CustomTable";

const PremiumSummary = () => {
  const [subMenuId, setSubMenuId] = useState([]);

  const handleSubmenuShow = (data) => {
    let idData = [...subMenuId];
    if (subMenuId.includes(data.id)) {
      let closeField = subMenuId.findIndex(value => value === data.id);
      idData.splice(closeField, 1);
      setSubMenuId(idData);
    } else {
      idData.push(data.id);
      if(!subMenuId.includes(data.id)) {
        setSubMenuId(idData);
      }
    }
  };

  // const renderData = (dataField, fieldType) => {
  //   if (!dataField || dataField.length === 0) {
  //     return null;
  //   }

  //   const fieldList = dataField[0];
  //   return (
  //     <>
  //       <div className="flex flex-wrap summary-field-container">
  //         {fieldType.map((data, index) => {
  //           return (
  //             <div className="field-content p-2 w-1/4">
  //               <div className="flex items-start">
  //                 {fieldList.parent && index === 0 && <i className="pi pi-plus-circle mr-3 mt-1 cursor-pointer" onClick={() => handleSubmenuShow(fieldList.id)}></i>}
  //                 <div className={!fieldList.parent && index === 0 && 'summary-sub-content'}>
  //                   <label>{data.header}</label>
  //                   <p>{fieldList[data.field]}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //       {subMenuId === fieldList.id && fieldList?.orders && fieldList?.orders?.length > 0 && (
  //         <div className="sub-menu summary-menu">
  //           {fieldList.orders.map((orderData, index) => (
  //             renderData([orderData], fieldType)
  //           ))}
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  const renderData = (header, fieldData) => {
    return (
      <>
        {fieldData.map((data, index) => (
          <>
            <div className={`flex border-bottom first-list`}>
              {header.map((dataindex, index) => (
                <>
                  <div className={`flex-1 body-text`}>
                    {data.subdata && index === 0 ? (
                      <div className="flex items-center p-2">
                        <i className={`pi pi-plus-circle mr-2 cursor-pointer icon-hover ${subMenuId.includes(data.id) ? 'active': ''}`} onClick={() => handleSubmenuShow(data)}></i>
                        <p>{data[dataindex.field]}</p>
                      </div>
                    ) : (
                      <p className="p-2">{data[dataindex.field]}</p>
                    )}
                  </div>
                </>
              ))}
            </div>
            {subMenuId?.includes(data.id) && data.subdata ? (
              <div className="sub-menu">{renderData(header, data.subdata)}</div>
            ) : null}
          </>
        ))}
      </>
    );
  };

  const renderFields = (fieldValue) => {
    return (
      <Card>
        <div className="flex mb-3">
          {fieldValue.header.map((data) => (
            <p className="flex-1 text-xl font-bold px-2" style={{color: 'rgb(67, 56, 202)'}}>{data.header}</p>
          ))}
        </div>
        {renderData(fieldValue.header, fieldValue.data)}
      </Card>
    );
  };

  return (
    <div className="pt-5 premium-summary">
      <div className="flex align-center flex-wrap pt-5 pb-5">
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Quotes Number :
          </label>
          <p className="font-medium">Q/10/1001/2024/0545</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy From Date :
          </label>
          <p className="font-medium">10/01/2024</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Policy To Date :
          </label>
          <p className="font-medium">10/02/2024</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Total Sum Insured :
          </label>
          <p className="font-medium">$2000</p>
        </div>
        <div className="w-1/3 p-2 flex items-center">
          <label className="pr-3" style={{ color: "#414141" }}>
            Total Sum Insured LC:
          </label>
          <p className="font-medium">$2000</p>
        </div>
      </div>
      <div className="mb-5 pb-3">{renderFields(premiumData)}</div>
      {/* <div className="mb-5 pb-3">
        {renderFields(commissionTableColumn, "Commission")}
      </div> */}
      <div className="mb-5 pb-3">{renderFields(commissionData)}</div>
      <div>
        <p className="text-2xl" style={{ fontWeight: "600" }}>
          Installment Detail
        </p>
        <div className="flex items-end">
          <div className="mt-3 w-1/4">
            <label>Method</label>
            <Dropdown />
          </div>
          <div className="mt-3 ml-3 w-1/4">
            <label>Type</label>
            <Dropdown />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DataTable value={installmentData}>
          {installmentHeader.map((column) => {
            return <Column field={column.field} header={column.header} />;
          })}
        </DataTable>
        {/* <CustomTable data={installmentData} columns={installmentHeader} /> */}
        <div className="mt-5">
          <p className="text-xl font-bold mb-2">Total</p>
          <div className="flex items-center">
            <div className="w-1/4">
              <label style={{ color: "rgba(0, 0, 0, 0.6)" }} className="pb-2">
                Total Percentage
              </label>
              <p style={{ color: "#4338CA", fontWeight: "600" }}>30%</p>
            </div>
            <div className="w-1/4">
              <label style={{ color: "rgba(0, 0, 0, 0.6)" }} className="pb-2">
                Total Net Amount TC
              </label>
              <p style={{ color: "#4338CA", fontWeight: "600" }}>32000</p>
            </div>
            <div className="w-1/4">
              <label style={{ color: "rgba(0, 0, 0, 0.6)" }} className="pb-2">
                Total Net Amount LC
              </label>
              <p style={{ color: "#4338CA", fontWeight: "600" }}>123124214</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button label="Save" />
        </div>
      </div>
    </div>
  );
};

export default PremiumSummary;
