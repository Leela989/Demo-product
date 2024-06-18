import { TabPanel, TabView } from "primereact/tabview";
import Address from "./Address";
import ApplicableDepartments from "./ApplicableDepartments";
import ApplicableDepartmentsData from "./ApplicableDepartmentsData.json";
import AddressData from "./AddressData";
import Data from "../DepartmentMaster/departments.json";

export default function TabComponents({ id }) {
  return (
    <div>
      <TabView className="w-full">
        <TabPanel header="Address" className="tabs">
          <Address data={AddressData} />
        </TabPanel>
        <TabPanel header="Applicable Departments" className="tabs">
          <ApplicableDepartments data={ApplicableDepartmentsData} id={id} />
        </TabPanel>
      </TabView>
    </div>
  );
}
