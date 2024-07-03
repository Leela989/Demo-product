import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function QuotationListing() {
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
          field="quotation_number"
          header="Quotation Number"
          body={(rowData, options) => rowData.quotation_number}
        />
        <Column
          field="quotation_requestDate"
          header="Quotation Request Date"
          body={(rowData, options) => rowData.quotation_requestDate}
        />

        <Column
          field="start_date"
          header="Start Date"
          body={(rowData, options) => rowData.start_date}
        />
        <Column
          field="end_date"
          header="End Date"
          body={(rowData, options) => rowData.end_date}
        />
        <Column
          field="channel"
          header="Channel"
          body={(rowData, options) => rowData.channel}
        />
        <Column
          field="premium"
          header="Premium"
          body={(rowData, options) => rowData.premium}
        />
        <Column
          field="quotation_status"
          header="Quotation Status"
          body={(rowData, options) => rowData.quotation_status}
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

export default QuotationListing;
