import { memo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CustomTable from "../../components/CustomTable/CustomTable";
import { getPlanData, masterPlanData } from "../../mock-data/plan/plan-table";
import PlanFormfields from "./sub-components/planFormFields";
import PlanTabGroup from "./sub-components/planTabGroup";
import "./plan.css";
import { Card } from "primereact/card";
import { useState } from "react";
import CustomButton from "../../components/Button/CustomButton";
import { Toast } from "primereact/toast";
import {
  getPlanMaster,
  getPlanMasterInitialData,
} from "../../mock-data/master";
import PlanTableData from "./table";

const Plan = () => {
  const { id, type } = useParams();
  const date = new Date();
  const toast = useRef(null);
  let EditData = type !== 'new' ? masterPlanData.find(data => data.id === Number(id)) : getPlanMasterInitialData.sections;
  let riskInitialState = getPlanMasterInitialData.sections.riskTypes;

  const [productPlanData, setProductPlanData] = useState(EditData);

  const riskOptions = getPlanMaster.risk;

  const columns = [
    { field: "risk", header: "Risk Type", fieldType: 'autoComplete'},
    { field: "insurableProduct", header: "Insurable Products", fieldType: 'autoComplete'},
    { field: "action", header: "" },
  ];

  // useEffect(() => {
  //   masterPlanData.map(data => {
  //     if(data.id === id) {
  //       setProductPlanData(data);
  //     }
  //     setProductPlanData(getPlanMasterInitialData)
  //   })
  // }, [])

  const handleMainUpdate = (data) => {
    setProductPlanData({ ...productPlanData, riskTypes: data });
  };

  /* Functions below */
  const handelRiskTableAdd = () => {
    if (
      productPlanData.riskTypes[productPlanData.riskTypes.length - 1].risk
        .name &&
      productPlanData.riskTypes[productPlanData.riskTypes.length - 1]
        .insurableProduct.name
    ) {
      const tempData =
        [
          ...productPlanData.riskTypes,
          { ...riskInitialState[0], id: productPlanData.riskTypes.length },
        ] ?? [];
      setProductPlanData({ ...productPlanData, riskTypes: [...tempData] });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill the row values",
      });
    }
  };

  const updatePlanSchemeData = (planSchemeData) => {
    let tempPlanData = { ...planSchemeData };
    setProductPlanData({
      ...productPlanData,
      planAndSchame: { ...tempPlanData },
    });
  };
  const updateTabDataPlan = (data, name) => {
    let tempPlanData = {...productPlanData, [name]: data};
    setProductPlanData(tempPlanData);
  }

  /* Render below */
  return (
    <div className="plan-container">
      <Toast ref={toast} />
      <div className="flex justify-end items-center">
        <p className="pe-4">
          Created By: <span>User</span>
        </p>
        <p>
          Created On:{" "}
          <span>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
        </p>
      </div>
      <PlanFormfields
        onUpdate={updatePlanSchemeData}
        data={productPlanData.planAndSchame}
      />
       <Card className={"w-4/5 risk-card"} style={{ marginTop: "24px" }}>
        <div className="flex justify-between items-center">
          <h1 className="card-header-text">Applicable Risk Type</h1>
          <CustomButton
            className={"small-btn"}
            label={"Add"}
            onClick={handelRiskTableAdd}
          />
        </div>
        <CustomTable
          name="riskTypes"
          columns={columns}
          data={productPlanData.riskTypes}
          onUpdate={handleMainUpdate}
          options={riskOptions}
        />
      </Card>
      <PlanTabGroup
        coverData={productPlanData.coverData.value}
        discountLoadingData={productPlanData.discountLoading.value}
        deductiblesData={productPlanData.deductibles.value}
        conditionsData={productPlanData.conditions.value}
        onPlanTabUpdate={updateTabDataPlan}
      />
    </div>
  );
};

export default memo(Plan);
