import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import transactionData from "./TransactionData.json";
import notesAndDairiesData from "./NotesAndDairies.json";
import Telephone from "../../assets/Telephone.png";
import ContactImg from "../../assets/ContactImg.png";
import data from "./MockHomePage.json";
import "./HomePage.css";
import './Modal.css';

function HomePage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedrow, setSelectedrow] = useState(null);
  
  const openModal = (rowData) => {
    setSelectedTransaction(rowData);
  };

  const openModal1 = (rowData) => {
    setSelectedrow(rowData);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const closeModal1 = () => {
    setSelectedrow(null);
  };

  const priorityBodyTemplate = (rowData) => {
    const priorityClass = rowData.priority === 'critical' ? 'critical' : '';
    return (
      <span className={priorityClass}>
        {rowData.priority}
      </span>
    );
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
      <a href="#" onClick={() => openModal(rowData)}>{rowData.transactionRef}</a>
    );
  };
  const renderLinkColumn1 = (rowData) => {
    return (
      <a href="#" onClick={() => openModal1(rowData)}>{rowData.transactionRef}</a>
    );
  };

  return (
    <div>
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
      <h1 className="tasksName">Tasks</h1>
      <div>
        <div className="imgContainer">
        <div className="customTable">
        <DataTable value={data} tableStyle={{ minWidth: '35rem' }}>
          <Column field="transactionRef" header="Transaction Ref#" className="transactionRefTexts" />
          <Column field="taskDetails" header="Task Details" />
          <Column field="priority" header="Priority" body={priorityBodyTemplate} />
          <Column field="status" header="Status" />
        </DataTable>
      </div>
          <div className="quickLinkContainer">
            <h1 className="quickLink">Quick Links</h1>
            <div>
              <div className="imgBox">
                <div className="telephoneButton">
                  <img src={Telephone} alt="Telephone" className="telephone1"/>
                  <a href="/create-application" className="quickLinkText">Create Application</a>
                </div>
                <div className="telephoneButton">
                  <img src={ContactImg} alt="ContactImg" className="telephone"/>
                  <a href="/create-application" className="quickLinkText">Create Quote</a>
                </div>
              </div>
              <div className="imgBox">
                <div className="telephoneButton">
                  <img src={Telephone} alt="Telephone" className="telephone1"/>
                  <a href="/create-application" className="quickLinkText">Policy Serving</a>
                </div>
                <div className="telephoneButton">
                  <img src={ContactImg} alt="ContactImg" className="telephone"/>
                  <a href="/create-application" className="quickLinkText">Renewal</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="tasksName">Notes & Dairies</h1>
      <div className="bottomLoginPage">
        <div className="customTable2">
          <DataTable value={notesAndDairiesData} tableStyle={{ minWidth: '50rem' }}>
          <Column field="transactionRef" header="Transaction Ref#" body={renderLinkColumn1} className="transactionRefText"/>
            <Column field="notes" header="Notes" />
            <Column field="reminderDate" header="Reminder Date" />
          </DataTable>
        </div>
      </div>
      {/* Modal */}
      {selectedTransaction && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Transaction Details</h2>
            <p>Transaction Ref#: {selectedTransaction.transactionRef}</p>
            <p>Task Details: {selectedTransaction.taskDetails}</p>
            <p>Priority: {selectedTransaction.priority}</p>
            <p>Status: {selectedTransaction.status}</p>
          </div>
        </div>
      )}
      {selectedrow && (
         <div className="modal">
         <div className="modal-content">
           <span className="close" onClick={closeModal1}>&times;</span>
           <div style={{display: 'flex', alignItems: 'center'}}>
             <p>
               Transaction Ref#: 
               <a href={`#${selectedrow.transactionRef}`} style={{ color: 'orange', marginLeft: '5px' }}>
                 {selectedrow.transactionRef}
               </a>
             </p>
           </div>
           <p>Notes: {selectedrow.notes}</p>
         </div>
       </div>
      )}
    </div>
  );
}

export default HomePage;
