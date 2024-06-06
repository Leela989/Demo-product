export const getPlanData = {
  riskTypes: [
    {
      id: 1,
      risk: {
        fieldType: "autoComplete",
        value: "",
        placeholder: "Risk Type",
        options: [
          { name: "01 - Option1", code: "01" },
          { name: "02 - Option2", code: "02" },
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
    }
  ],
};

export const getTabPanelData = {
  covers: {
    tableHeader: [
      { field: "cover", header: "Cover" },
      { field: "mandatory", header: "Mandatory" },
      { field: "action", header: "" },
    ],
    name: "Covers",
    rows: [
      {
        id: 1,
        mandatory: {
          fieldType: "checkBox",
          name: "Mandatory",
        },
        cover: {
          fieldType: "autoComplete",
          value: "",
          placeholder: "Cover",
          options: [
            { name: "01 - Option1", code: "01" },
            { name: "02 - Option2", code: "02" },
          ],
          name: "Cover",
        },
        action: ["Delete"],
      }
    ],
  },
  discountLoading: {
    tableHeader: [
      { field: "discountLoading", header: "Discount / Loading" },
      { field: "mandatory", header: "Mandatory" },
      { field: "action", header: "" },
    ],
    name: "Discount & Loading",
    rows: [
      {
        id: 1,
        mandatory: {
          fieldType: "checkBox",
          name: "Mandatory",
        },
        discountLoading: {
          fieldType: "autoComplete",
          value: "",
          placeholder: "Cover",
          options: [
            { name: "01 - Option1", code: "01" },
            { name: "02 - Option2", code: "02" },
          ],
          name: "Discount & Loading",
        },
        action: ["Delete"],
      }
    ],
  },
  deductibles: {
    tableHeader: [
      { field: "deductibles", header: "Deductibles" },
      { field: "mandatory", header: "Mandatory" },
      { field: "action", header: "" },
    ],
    name: "Discount & Loading",
    rows: [
      {
        id: 1,
        mandatory: {
          fieldType: "checkBox",
          name: "Mandatory",
        },
        deductibles: {
          fieldType: "autoComplete",
          value: "",
          placeholder: "Cover",
          options: [
            { name: "01 - Option1", code: "01" },
            { name: "02 - Option2", code: "02" },
          ],
          name: "Deductibles",
        },
        action: ["Delete"],
      },
    ],
  },
  conditions: {
    tableHeader: [
      { field: "conditions", header: "Conditions" },
      { field: "mandatory", header: "Mandatory" },
      { field: "action", header: "" },
    ],
    name: "Conditions",
    rows: [
      {
        id: 1,
        mandatory: {
          fieldType: "checkBox",
          name: "Mandatory",
        },
        conditions: {
          fieldType: "autoComplete",
          value: "",
          placeholder: "Cover",
          options: [
            { name: "01 - Option1", code: "01" },
            { name: "02 - Option2", code: "02" },
          ],
          name: "Deductibles",
        },
        action: ["Delete"],
      }
    ],
  },
};
