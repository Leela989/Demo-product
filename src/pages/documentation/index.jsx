import { TabPanel, TabView } from "primereact/tabview";
import CustomTable from "../../components/CustomTable/CustomTable";
import LanguageDescription from "../../components/language-description/lang-desctiption";
import { getMasterData } from "../../mock-data/master";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Steps } from 'primereact/steps';
import { Checkbox } from "primereact/checkbox";

const Documentation = () => {
  const [masterData, setMasterData] = useState(getMasterData);
  const tableMockData = [
    {
      id: 1,
      name: "Sample-1",
      description: "Description-1",
      shortDescription: "Short Description-1",
      insurableProduct: {
        fieldType: "singleLine",
        type: "text",
        placeholder: "Input Field",
        value: "",
        name: "tableInput",
      },
      riskType: {
        fieldType: "dropDown",
        value: "",
        placeholder: "Dropdown Field",
        options: [
          { name: "option1", code: "01" },
          { name: "option2", code: "02" },
        ],
        name: "tableDrop",
      },
      value: "1",
      action: ["edit", "Delete"],
    },
    {
      id: 2,
      name: "Sample-2",
      description: "Description-2",
      shortDescription: "Short Description-2",
      value: "2",
      action: ["edit", "Delete"],
    },
    {
      id: 3,
      name: "Sample-3",
      description: "Description-3",
      shortDescription: "Short Description-3",
      value: "3",
      action: ["edit", "Delete"],
    },
  ];

  const dataValue = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "shortDescription", header: "Short Description" },
    { field: "insurableProduct", header: "Insurable Products" },
    { field: "riskType", header: "Risk Type" },
    { field: "value", header: "Value" },
    { field: "action", header: "" },
  ];
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [checked, setChecked] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const items = [
    {
        label: 'Personal'
    },
    {
        label: 'Seat'
    },
    {
        label: 'Payment'
    },
    {
        label: 'Confirmation'
    }
];
  return (
    <div className="p-5">
      <h1 className="font-bold text-xl pb-4">Table Components</h1>
      <div className="table-container">
        <CustomTable data={tableMockData} columns={dataValue} />
      </div>
      <h1 className="font-bold text-xl py-4">Tab Components</h1>
      <TabView>
        <TabPanel header="Header I">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel header="Header II">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Header III">
          <p className="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView>
      <h1 className="font-bold text-xl py-4">Description</h1>
      <LanguageDescription langData={masterData.languageDescription} onLangUpdate={()=>{console.log("lang")}} />

      <h1 className="font-bold text-xl py-4">Dropdown</h1>
      <div>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
          className="w-full md:w-14rem"
        />
      </div>
      <h1 className="font-bold text-xl py-4">Button</h1>
      <h3 className="pb-4">Fill Button</h3>
      <div>
        <Button label="Primary" />
        {/* <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" /> */}
      </div>
      <h3 className="py-4">Disabled</h3>
      <Button label="Submit" disabled />
      <h3 className="py-4">Outline Button</h3>
      <Button outlined label="primary" />
      <h1>Stepper</h1>
      <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
      <h1>CheckBox</h1>
      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
    </div>
  );
};

export default Documentation;
