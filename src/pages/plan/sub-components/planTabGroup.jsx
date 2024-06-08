import { useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {  getPlanColumnData,
} from "../../../mock-data/plan/plan-table";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";
import { getPlanMaster, getPlanMasterInitialData } from "../../../mock-data/master";

const PlanTabGroup = ({
  coverData,
  discountLoadingData,
  deductiblesData,
  conditionsData,
  onPlanTabUpdate
}) => {
  const [coverPanelData, setCoverpanelData] = useState(coverData);
  const [discountLoadingPanelData, setDiscountLoadingCoverpanelData] =
    useState(discountLoadingData);
  const [deductiblesPanelData, setDeductiblespanelData] =
    useState(deductiblesData);
  const [conditionsPanelData, setConditionspanelData] =
    useState(conditionsData);
  const { covers, discountLoading, deductibles, conditions } =
    getPlanColumnData;

  let {
    coverData: newCoverField,
    discountLoading: newDiscountField,
    deductibles: newDeductiblesField,
    conditions: newConditionsField,
  } = getPlanMasterInitialData.sections;

  let {coversOptions, discountLoadingsOptions, deductiblesOptions, conditionsOptions} = getPlanMaster;

  const [activeIndex, setActiveIndex] = useState(0);
console.log(newCoverField, "coversInit");
  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

  const handelTableChange = (value, dataType) => {
    planTabData.map((data, index) =>
      activeIndex === index &&
        data.setData([...value])
    );
  };

  // useEffect(() => {
  //   console.log(".................1", coverPanelData);
  // }, [coverPanelData]);
  // useEffect(() => {
  //   console.log(".................2", discountLoadingPanelData);
  // }, [discountLoadingPanelData]);
  // useEffect(() => {
  //   console.log(".................3", deductiblesPanelData);
  // }, [deductiblesPanelData]);
  // useEffect(() => {
  //   console.log(".................4", conditionsPanelData);
  // }, [conditionsPanelData]);

  const planTabData = [
    {
      name: "Covers",
      dataName: 'coverData',
      tableData: coverPanelData,
      columns: covers.tableHeader,
      options: coversOptions,
      setData: setCoverpanelData,
      initalData: newCoverField.value[0],
    },
    {
      name: "Discount & Loading",
      dataName: 'discountLoading',
      tableData: discountLoadingPanelData,
      columns: discountLoading.tableHeader,
      options: discountLoadingsOptions,
      setData: setDiscountLoadingCoverpanelData,
      initalData: newDiscountField.value[0],
    },
    {
      name: "Deductibles",
      dataName: 'deductibles',
      tableData: deductiblesPanelData,
      columns: deductibles.tableHeader,
      options: deductiblesOptions,
      setData: setDeductiblespanelData,
      initalData: newDeductiblesField.value[0],
    },
    {
      name: "Conditions",
      dataName: 'conditions',
      tableData: conditionsPanelData,
      columns: conditions.tableHeader,
      options: conditionsOptions,
      setData: setConditionspanelData,
      initalData: newConditionsField.value[0],
    },
  ];

  const handleAdd = () => {
    planTabData.map((data, index) => {
      if (activeIndex === index) {
        let tempTabData = [...data.tableData, data.initalData];
        data.setData(tempTabData);
        onPlanTabUpdate(tempTabData, data.dataName)
      }
    });
  };

  return (
    <Card className="plan-tab-container">
      <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
        {planTabData.map((data) => {
          return (
            <TabPanel header={data.name}>
              <CustomTable
                name = {data.name}
                data={data.tableData}
                columns={data.columns}
                options ={data.options}
                onUpdate={handelTableChange}
              />
            </TabPanel>
          );
        })}
      </TabView>
      <CustomButton
        label={"Add"}
        onClick={handleAdd}
        className={"top-button small-btn"}
      />
    </Card>
  );
};

export default PlanTabGroup;
