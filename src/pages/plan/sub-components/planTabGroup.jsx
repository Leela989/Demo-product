import { TabPanel, TabView } from "primereact/tabview";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { getTabPanelData } from "../../../mock-data/plan/plan-table";
import { Card } from "primereact/card";
import CustomButton from "../../../components/Button/CustomButton";

const PlanTabGroup = () => {
  const tabPanelData = getTabPanelData;
  return (
    <Card className="plan-tab-container">
      <TabView>
        <TabPanel header="Covers">
          <CustomTable
            data={tabPanelData.covers.rows}
            columns={tabPanelData.covers.tableHeader}
          />
        </TabPanel>
        <TabPanel header="Discount & Loading">
          <CustomTable
            data={tabPanelData.discountLoading.rows}
            columns={tabPanelData.discountLoading.tableHeader}
          />
        </TabPanel>
        <TabPanel header="Deductibles">
          <CustomTable
            data={tabPanelData.deductibles.rows}
            columns={tabPanelData.deductibles.tableHeader}
          />
        </TabPanel>
        <TabPanel header="Conditions">
          <CustomTable
            data={tabPanelData.conditions.rows}
            columns={tabPanelData.conditions.tableHeader}
          />
        </TabPanel>
      </TabView>
      <CustomButton label={"Add"} className={"top-button small-btn"} />
    </Card>
  );
};

export default PlanTabGroup;
