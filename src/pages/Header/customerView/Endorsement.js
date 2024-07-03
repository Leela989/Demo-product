import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Endorsement() {
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
          field="product_name"
          header="Product Name"
          body={(rowData, options) => rowData.product_name}
        />

        <Column
          field="business_type"
          header="Business Type"
          body={(rowData, options) => rowData.business_type}
        />
        <Column
          field="customer_name"
          header="Customer Name"
          body={(rowData, options) => rowData.customer_name}
        />
        <Column
          field="insured_name"
          header="Insured Name"
          body={(rowData, options) => rowData.insured_name}
        />
        <Column
          field="intermediatry"
          header="Intermediatry"
          body={(rowData, options) => rowData.intermediatry}
        />
        <Column
          field="channel"
          header="Channel"
          body={(rowData, options) => rowData.channel}
        />
        <Column
          field="endorsementNo"
          header="Endorsement/Quatation No."
          body={(rowData, options) => rowData.channel}
        />
        <Column
          field="openCover_openPolicy_No"
          header="OpenCover/OpenPloicy No"
          body={(rowData, options) => rowData.openCover_openPolicy_No}
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

export default Endorsement;
