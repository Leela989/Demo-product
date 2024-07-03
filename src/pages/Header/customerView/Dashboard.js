import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <div className="box">
          <div className="headers">Quotation Count</div>
          <div className="box_row">
            <div className="row">
              <div className="column">Requested</div>
              <div className="column1">0</div>
            </div>
            <div className="row">
              <div className="column">Accepted/Approved</div>
              <div className="column1">0</div>
            </div>
            <div className="row">
              <div className="column">Rejected</div>
              <div className="column1">0</div>
            </div>
            <div className="row">
              <div className="column">Converted to Policy</div>
              <div className="column1">0</div>
            </div>
            <div className="row">
              <div className="column">Expired</div>
              <div className="column1">0</div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="headers">Policy Count</div>
          <div className="box_row">
          <div className="row">
            <div className="column">Approved (Active)</div>
            <div className="column">0</div>
          </div>
          <div className="row">
            <div className="column">Incomplete</div>
            <div className="column">0</div>
          </div>
          <div className="row">
            <div className="column">Cancelled</div>
            <div className="column">0</div>
          </div>
          <div className="row">
            <div className="column">Endorsements</div>
            <div className="column">0</div>
          </div>
          <div className="row">
            <div className="column">Due for Renewal</div>
            <div className="column">0</div>
          </div>
          </div>

        </div>
        <div className="box">
          <div className="headers">Premium Details</div>
          <div className="box_row">
          <div className="row">
            <div className="column">Total</div>
            <div className="column">0.00</div>
          </div>
          <div className="row">
            <div className="column">Received</div>
            <div className="column">0.00</div>
          </div>
          <div className="row">
            <div className="column">Outstanding</div>
            <div className="column">0.00</div>
          </div>
          <div className="row">
            <div className="column">Over Due</div>
            <div className="column">0.00</div>
          </div>
          </div>

        </div>
      </div>
      <div className="container2">
        <div className="box">
          <div className="headers">Claims Info</div>
          <div className="box_row">
            <div className="row">
              <div className="column">Count of Claims</div>
              <div className="column">:0</div>
            </div>
            <div className="row">
              <div className="column">Total Claims Outstanding</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Total Claim Paid</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Gross Premium</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Re-insurance Premium</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Net Premium</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Earned Premium(On Net)</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Earned Premium(On Gross)</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Loss Ratio(On Gross)</div>
              <div className="column">:0.00</div>
            </div>
            <div className="row">
              <div className="column">Loss Ratio(On Net)</div>
              <div className="column">:0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
