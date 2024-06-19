import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import transactionData from "./TransactionData.json";
import notesAndDairiesData from "./NotesAndDairies.json";
import Telephone from "../../assets/Telephone.png";
import ContactImg from "../../assets/ContactImg.png";
import data from "./MockHomePage.json";
import "./HomePage.css";
import "./Modal.css";
import DialogueBox from "../../components/DialogueBox/DialogueBox";

function HomePage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedrow, setSelectedrow] = useState(null);
  const toast = useRef(null);
  const [toastShown, setToastShown] = useState(false);
  let userNameIs = localStorage.getItem("username");

  // useEffect(() => {
  //   if (!toastShown) {
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Welcome",
  //       detail: userNameIs,
  //       life: 3000,
  //     });
  //     setToastShown(true);
  //   }
  // }, [userNameIs]);

  const openModal = (rowData) => {
    setSelectedTransaction(rowData);
  };

  const openModal1 = (rowData) => {
    setSelectedrow(rowData);
  };

  const openModal2 = (rowData) => {
    
  }

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const closeModal1 = () => {
    setSelectedrow(null);
  };

  const priorityBodyTemplate = (rowData) => {
    const priorityClass = rowData.priority === "critical" ? "critical" : "";
    return <span className={priorityClass}>{rowData.priority}</span>;
  };

  const renderKeyValuePairs = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="transactionText">
        <p className="textBox">{key}</p>
        <p className="textBoxNumb">{value}</p>
      </div>
    ));
  };

  const renderLinkColumn = (rowData) => {
    return (
      <a href="#" onClick={() => openModal(rowData)}>
        {rowData.transactionRef}
      </a>
    );
  };

  const renderLinkColumn1 = (rowData) => {
    return (
      <a href="#" onClick={() => openModal1(rowData)}>
        {rowData.transactionRef}
      </a>
    );
  };

  const renderLinkColumn2 = (rowData) => {
    return (
      <a href="#" onClick={() => openModal2(rowData)}>
        {rowData.transactionRef}
      </a>
    );
  };

  const renderPopUpMessage = () => (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className="pi pi-clipboard" style={{ fontSize: "2rem" }}></i>
        <h1 className="dailogueBox">
          <a
            href={`#${selectedrow.transactionRef}`}
            style={{ color: "#003B95", marginLeft: "5px" }}
          >
            {selectedrow.transactionRef}
          </a>
        </h1>
      </div>
      <p style={{ paddingTop: "20px", color: "#003B95", fontSize: "18px" }}>
        Notes:
      </p>
      <div style={{ paddingTop: "10px", fontSize: "16px" }}>
        {selectedrow.notes}
      </div>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} position="top-left" />
      <div className="transactionsContainer">
        {transactionData.map((item, index) => (
          <div key={index} className="transactions">
            <h1 className="transactionsHeading">{item.name}</h1>
            <div className="transactionBox">
              {renderKeyValuePairs(item.data)}
            </div>
            <div className="teamsPerformanceLink">
              <a href="/" className="teamsPerformance">
                Team's Performance
              </a>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="imgContainer">
          <div className="flex-1" style={{marginRight: '30px'}}>
            <h1 className="tasksName">Tasks</h1>
            <div className="customTable">
              <DataTable
                value={data}
                scrollable
                tableStyle={{ minWidth: "35rem" }}
              >
                <Column
                  field="transactionRef"
                  header="Transaction Ref#"
                  className="transactionRefText"
                  body={renderLinkColumn2}
                />
                <Column field="taskDetails" header="Task Details" />
                <Column
                  field="priority"
                  header="Priority"
                  body={priorityBodyTemplate}
                />
                <Column field="status" header="Status" />
              </DataTable>
            </div>
          </div>
          <div className="quickLinkContainer">
            <h1 className="quickLink">Quick Links</h1>
            <div>
              <div className="imgBox">
                <div className="telephoneButton">
                  <img src={Telephone} alt="Telephone" className="telephone1" />
                  <a href="/create-application" className="quickLinkText">
                    Create Application
                  </a>
                </div>
                <div className="telephoneButton">
                  <img
                    src={ContactImg}
                    alt="ContactImg"
                    className="telephone"
                  />
                  <a href="/create-application" className="quickLinkText">
                    Create Quote
                  </a>
                </div>
                <div className="telephoneButton">
                  <img src={Telephone} alt="Telephone" className="telephone1" />
                  <a href="/create-application" className="quickLinkText">
                    Policy Serving
                  </a>
                </div>
                <div className="telephoneButton">
                  <img
                    src={ContactImg}
                    alt="ContactImg"
                    className="telephone"
                  />
                  <a href="/create-application" className="quickLinkText">
                    Renewal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="tasksName">Notes & Dairies</h1>
      <div className="customTable2">
        <DataTable
          value={notesAndDairiesData}
          scrollable
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="transactionRef"
            header="Transaction Ref#"
            body={renderLinkColumn1}
            className="transactionRefText"
            style={{ width: "200px" }}
          />
          <Column
            field="notes"
            header="Notes"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
          <Column field="reminderDate" header="Reminder Date" />
        </DataTable>
      </div>
      {/* Modal */}
      {selectedTransaction && (
        <DialogueBox
          data={renderPopUpMessage()}
          header="Transaction Details"
          visible={selectedTransaction}
          onClose={closeModal}
        />
      )}
      {selectedrow && (
        <DialogueBox
          data={renderPopUpMessage()}
          showFooter={false}
          visible={selectedrow}
          onClose={closeModal1}
        />
      )}
    </div>
  );
}

export default HomePage;
