import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function RiPolicies() {
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
          field="endorsement_num"
          header="Endorsement Num"
          body={(rowData, options) => rowData.endorsement_num}
        />
        <Column
          field="fac_placed_yn"
          header="FAC Placed Y/N"
          body={(rowData, options) => rowData.fac_placed_yn}
        />
        <Column
          field="num_of_placements"
          header="Num of Placement(s)"
          body={(rowData, options) => rowData.num_of_placements}
        />
        <Column
          field="retn_premium"
          header="Retn. Premium"
          body={(rowData, options) => rowData.retn_premium}
        />
        <Column
          field="treaty_premium"
          header="Treaty Premium"
          body={(rowData, options) => rowData.treaty_premium}
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

export default RiPolicies;
