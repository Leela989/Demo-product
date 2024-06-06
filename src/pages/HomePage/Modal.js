import React from "react";
import './Modal.css';

function Modal({ isOpen, onClose, data }) {
  if (!isOpen || !data) {
    return null;
  }


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Transaction Details</h2>
        <p>Transaction Ref#: {data.transactionRef}</p>
        <p>Task Details: {data.taskDetails}</p>
        <p>Priority: {data.priority}</p>
        <p>Status: {data.status}</p>
        {/* Add other fields as needed */}
      </div>
    </div>
  );
}

export default Modal;
