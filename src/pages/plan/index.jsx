import CustomTable from "../../components/CustomTable/CustomTable";
import { getPlanData } from "../../mock-data/plan/plan-table";
import PlanFormfields from "./sub-components/planFormFields";
import PlanTabGroup from "./sub-components/planTabGroup";
import "./plan.css";
import { Card } from "primereact/card";
import { useState } from "react";
import CustomButton from "../../components/Button/CustomButton";

const Plan = () => {
  const date = new Date();
  let { riskTypes } = getPlanData;
  let riskInitialState = {
    risk: {
      fieldType: "autoComplete",
      value: "",
      placeholder: "Risk Type",
      options: [
        { name: "option1", code: "01" },
        { name: "option2", code: "02" },
      ],
      name: "riskType",
    },
    insurableProduct: {
      fieldType: "autoComplete",
      value: "",
      placeholder: "insurable Product",
      options: [
        { name: "option1", code: "01" },
        { name: "option2", code: "02" },
      ],
      name: "insurableProduct",
    },
    action: ["edit", "Delete"],
  };

  const [riskTypeData, setRiskTypeData] = useState(riskTypes);

  const columns = [
    { field: "risk", header: "Risk Type" },
    { field: "insurableProduct", header: "Insurable Products" },
    { field: "action", header: "" },
  ];
  /* Functions below */
  const handleRiskTypeTableData = (name, value) => {
    console.log(name, value);
  }
  // console.log(riskTypeData, "riskTypeData");
  /* Render below */
  return (
    <div className="plan-container">
      <div className="flex justify-end items-center">
        <p className="pe-4">
          Created By: <span>User</span>
        </p>
        <p>
          Created On:{" "}
          <span>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
        </p>
      </div>
      <PlanFormfields />
      <Card className={"w-1/2"} style={{ marginTop: "24px" }}>
        <div className="flex justify-between items-center">
          <h1 className="card-header-text">Applicable Risk Type</h1>
          <CustomButton className={"small-btn"} label={'Add'} onClick={()=>setRiskTypeData(prevData =>([...prevData, riskInitialState]))} />
        </div>
        <CustomTable onUpdate={handleRiskTypeTableData} columns={columns} data={riskTypeData} />
      </Card>
      <PlanTabGroup />
    </div>
  );
};

export default Plan;
