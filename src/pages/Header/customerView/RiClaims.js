import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function RiClaims() {
  return (
    <div>
      <DataTable
        value={""}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        isDataSelectable={false}
      >
        <Column
          field="actions"
          header="Actions"
          body={(rowData, options) => rowData.actions}
        />
        <Column
          field="Class_name"
          header="Class Name"
          body={(rowData, options) => rowData.class_name}
        />
        <Column
          field="product"
          header="Product"
          body={(rowData, options) => rowData.product}
        />

        <Column
          field="treaty_description"
          header="Treaty Description"
          body={(rowData, options) => rowData.treaty_description}
        />
        <Column
          field="policy_num"
          header="Policy Numb"
          body={(rowData, options) => rowData.policy_num}
        />
        <Column
          field="claim_num"
          header="Claim Num"
          body={(rowData, options) => rowData.claim_num}
        />
        <Column
          field="estimated_reserve"
          header="Estimated Reserve"
          body={(rowData, options) => rowData.estimated_reserve}
        />
        <Column
          field="retention_reserve"
          header="Retention Reserve"
          body={(rowData, options) => rowData.retention_reserve}
        />
        <Column
          field="treaty_reserve"
          header="Treaty Reserve"
          body={(rowData, options) => rowData.treaty_reserve}
        />
        {/* <Column
          body={(rowData, options) =>
            actionBodyTemplate(rowData, options.rowIndex)
          }
          style={{ width: "5%" }}
        /> */}
      </DataTable>
    </div>
  );
}

export default RiClaims;
