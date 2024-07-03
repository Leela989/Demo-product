import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Registered_claims() {
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
          field="claim_notification_no"
          header="Claim Notification No"
          body={(rowData, options) => rowData.claim_notification_no}
        />
        <Column
          field="claim_notified_date"
          header="Claim Notified Date"
          body={(rowData, options) => rowData.claim_notified_date}
        />

        <Column
          field="notification_channel"
          header="Notification Channel"
          body={(rowData, options) => rowData.notification_channel}
        />
        <Column
          field="claim_type"
          header="Claim Type"
          body={(rowData, options) => rowData.claim_type}
        />
        <Column
          field="claim_reference_number"
          header="Claim Reference Number"
          body={(rowData, options) => rowData.claim_reference_number}
        />
        <Column
          field="claim_number"
          header="Claim Number"
          body={(rowData, options) => rowData.claim_number}
        />
        <Column
          field="policy_no"
          header="Policy No"
          body={(rowData, options) => rowData.policy_no}
        />
        <Column
          field="loss_date"
          header="Loss Date"
          body={(rowData, options) => rowData.loss_date}
        />
        <Column
          field="loss_remarks"
          header="Loss Remarks"
          body={(rowData, options) => rowData.loss_remarks}
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

export default Registered_claims;
