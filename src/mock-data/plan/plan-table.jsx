export const masterPlanData = [
  {
    id: 1,
    planAndSchame: {
      code: "P101",
      type: { name: "Plan", code: "01" },
      product: "1001",
      description: [
        { lang: "english", code: "en", description: "Platinum" },
        { lang: "franch", code: "fr", description: "" },
      ],
      shortDescription: "Platinum",
      effectiveForm: "01-Jan-2024",
      effectiveTo: "31-Dec-2024",
    },
    riskTypes: [
      {
        id: 0,
        risk: { name: "Motor Commercial", code: "MC" },
        insurableProduct: { name: "Vehicle", code: "VL" },
      },
    ],
    coverData: {
      value: [
        { name: "Own Damage", code: "3101", mandatory: true },
        { name: "Third party Death ", code: "3176", mandatory: true },
        { name: "Third party property damage", code: "3178", mandatory: true },
        { name: "PA Benefit to Driver", code: "3106", mandatory: false },
        { name: "Road Assistance", code: "3195", mandatory: false },
        { name: "Agency Repair", code: "3103", mandatory: false },
        { name: "Natural Calamity Cover", code: "3104", mandatory: false },
        { name: "Geographical Extension", code: "3105", mandatory: false },
        { name: "Fire And Theft", code: "3177", mandatory: false },
        { name: "Replacement Car", code: "3196", mandatory: false },
        {
          name: "Political violence, terrorism and sabotage",
          code: "3338",
          mandatory: false,
        },
        { name: "Credit Protection Cover", code: "3707", mandatory: false },
        { name: "Personal Accident Passenger", code: "3102", mandatory: false },
      ],
    },
    discountLoading: {
      value: [
        { type: "D", name: "Special Discount", code: "4001", mandatory: false },
        { type: "D", name: "General Discount", code: "4002", mandatory: false },
        {
          type: "D",
          name: "No Claim Bonus/Discount",
          code: "4005",
          mandatory: false,
        },
        {
          type: "D",
          name: "Large Volume Discount",
          code: "4020",
          mandatory: false,
        },
        { type: "D", name: "LTA Discount", code: "4008", mandatory: false },
        { type: "L", name: "Special Loading", code: "5001", mandatory: false },
      ],
    },
    deductibles: {
      value: [
        { name: "Excess on % of Claim", code: "6023", mandatory: false },
        { name: "Compulsory Excess", code: "6020", mandatory: false },
        {
          name: "Driver's License less than 2 years",
          code: "6667",
          mandatory: false,
        },
        { name: "Driver under 21 years", code: "6666", mandatory: false },
      ],
    },
    conditions: {
      value: [
        {
          name: "1   For Terms and conditions refer the policy.",
          code: "242",
          mandatory: false,
        },
        {
          name: "04   Authorised Repair Limit [Section 1 - 4 (a)]",
          code: "3",
          mandatory: false,
        },
        { name: "02   Section II-1(a) and 2(a)", code: "5", mandatory: false },
        { name: "01   Section 1 - 3", code: "8", mandatory: false },
        { name: "03   Section II-1(b) and 2(b)", code: "9", mandatory: false },
      ],
    },
  },

  {
    id: 2,
    planAndSchame: {
      code: "P102",
      type: { name: "Plan", code: "01" },
      product: "1001",
      description: [
        { lang: "english", code: "en", description: "Gold" },
        { lang: "franch", code: "fr", description: "" },
      ],
      shortDescription: "Gold",
      effectiveForm: "01-Jan-2024",
      effectiveTo: "31-Dec-2024",
    },
    riskTypes: [
      {
        id: 0,
        risk: { name: "Motor Commercial", code: "MC" },
        insurableProduct: { name: "Vehicle", code: "VL" },
      },
    ],
    coverData: {
      value: [
        { name: "Own Damage", code: "3101", mandatory: true },
        { name: "Third party Death ", code: "3176", mandatory: true },
        { name: "Third party property damage", code: "3178", mandatory: true },
        { name: "PA Benefit to Driver", code: "3106", mandatory: false },
        { name: "Road Assistance", code: "3195", mandatory: false },
        { name: "Agency Repair", code: "3103", mandatory: false },
        { name: "Natural Calamity Cover", code: "3104", mandatory: false },
        { name: "Geographical Extension", code: "3105", mandatory: false },
        { name: "Personal Accident Passenger", code: "3102", mandatory: false },
      ],
    },
    discountLoading: {
      value: [
        { type: "D", name: "Special Discount", code: "4001", mandatory: false },
        { type: "D", name: "General Discount", code: "4002", mandatory: false },
        {
          type: "D",
          name: "No Claim Bonus/Discount",
          code: "4005",
          mandatory: false,
        },
        {
          type: "D",
          name: "Large Volume Discount",
          code: "4020",
          mandatory: false,
        },
        { type: "D", name: "LTA Discount", code: "4008", mandatory: false },
        { type: "L", name: "Special Loading", code: "5001", mandatory: false },
      ],
    },
    deductibles: {
      value: [
        { name: "Excess on % of Claim", code: "6023", mandatory: false },
        { name: "Compulsory Excess", code: "6020", mandatory: false },
        {
          name: "Driver's License less than 2 years",
          code: "6667",
          mandatory: false,
        },
        { name: "Driver under 21 years", code: "6666", mandatory: false },
      ],
    },
    conditions: {
      value: [
        {
          name: "1   For Terms and conditions refer the policy.",
          code: "242",
          mandatory: false,
        },
        {
          name: "04   Authorised Repair Limit [Section 1 - 4 (a)]",
          code: "3",
          mandatory: false,
        },
        { name: "02   Section II-1(a) and 2(a)", code: "5", mandatory: false },
        { name: "01   Section 1 - 3", code: "8", mandatory: false },
        { name: "03   Section II-1(b) and 2(b)", code: "9", mandatory: false },
      ],
    },
  },

  {
    id: 3,
    planAndSchame: {
      code: "P103",
      type: { name: "Plan", code: "01" },
      product: "1001",
      description: [
        { lang: "english", code: "en", description: "Silver" },
        { lang: "franch", code: "fr", description: "" },
      ],
      shortDescription: "Silver",
      effectiveForm: "01-Jan-2024",
      effectiveTo: "31-Dec-2024",
    },
    riskTypes: [
      {
        id: 0,
        risk: { name: "Motor Commercial", code: "MC" },
        insurableProduct: { name: "Vehicle", code: "VL" },
      },
    ],
    coverData: {
      value: [
        { name: "Own Damage", code: "3101", mandatory: true },
        { name: "Third party Death ", code: "3176", mandatory: true },
        { name: "Third party property damage", code: "3178", mandatory: true },
        { name: "Road Assistance", code: "3195", mandatory: false },
        { name: "Agency Repair", code: "3103", mandatory: false },
        { name: "Natural Calamity Cover", code: "3104", mandatory: false },
      ],
    },
    discountLoading: {
      value: [
        { type: "D", name: "Special Discount", code: "4001", mandatory: false },
        { type: "D", name: "General Discount", code: "4002", mandatory: false },
        { type: "D", name: "LTA Discount", code: "4008", mandatory: false },
        { type: "L", name: "Special Loading", code: "5001", mandatory: false },
      ],
    },
    deductibles: {
      value: [
        { name: "Excess on % of Claim", code: "6023", mandatory: false },
        { name: "Compulsory Excess", code: "6020", mandatory: false },
        {
          name: "Driver's License less than 2 years",
          code: "6667",
          mandatory: false,
        },
        { name: "Driver under 21 years", code: "6666", mandatory: false },
      ],
    },
    conditions: {
      value: [
        {
          name: "1   For Terms and conditions refer the policy.",
          code: "242",
          mandatory: false,
        },
        {
          name: "04   Authorised Repair Limit [Section 1 - 4 (a)]",
          code: "3",
          mandatory: false,
        },
        { name: "02   Section II-1(a) and 2(a)", code: "5", mandatory: false },
        { name: "01   Section 1 - 3", code: "8", mandatory: false },
        { name: "03   Section II-1(b) and 2(b)", code: "9", mandatory: false },
      ],
    },
  },
];

export const getPlanColumnData = {
  covers: {
    tableHeader: [
      { field: "covers", header: "Covers", fieldType: "autoComplete" },
      { field: "mandatory", header: "Mandatory", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
  discountLoading: {
    tableHeader: [
      {
        field: "discountLoading",
        header: "Discount / Loading",
        fieldType: "autoComplete",
      },
      { field: "mandatory", header: "Mandatory", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },

  deductibles: {
    tableHeader: [
      {
        field: "deductibles",
        header: "Deductibles",
        fieldType: "autoComplete",
      },
      { field: "mandatory", header: "Mandatory", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },

  conditions: {
    tableHeader: [
      { field: "conditions", header: "Conditions", fieldType: "autoComplete" },
      { field: "mandatory", header: "Mandatory", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
};
