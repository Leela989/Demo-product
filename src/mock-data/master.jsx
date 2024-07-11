export const getMasterData = {
  defaultLanguage: "en",
  languageDescription: {
    default: "en",
    data: [
      { lang: "English", code: "en", description: "" },
      { lang: "Franch", code: "fr", description: "" },
    ],
  },
  plan: {
    type: [
      { name: "Plan", code: "01" },
      { name: "Scheme", code: "02" },
    ],
    products: [
      { code: "10", name: "10-Motor" },
      { code: "20", name: "20-Fire" },
      { code: "30", name: "30-Marine" },
      { code: "40", name: "40-Engineering" },
      { code: "50", name: "50-Miscellaneous and Accident" },
      { code: "60", name: "60-Liability" },
      { code: "70", name: "70-Bonds" },
      { code: "80", name: "80-Aviation" },
      { code: "90", name: "90-Package" },
      { code: "91", name: "91-Agriculture" },
    ],
  },
};

export const getPlanMasterInitialData = {
  sections: {
    planAndSchame: {
      code: "",
      type: {},
      product: "",
      description: [
        { lang: "english", code: "en", description: "" },
        { lang: "franch", code: "fr", description: "" },
      ],
      shortDescription: "",
      effectiveForm: "",
      effectiveTo: "",
    },
    riskTypes: [
      {
        id: 0,
        risk: { name: "", code: "" },
        insurableProduct: { name: "", code: "" },
      },
    ],
    coverData: { value: [{ name: "", code: "", mandatory: true }] },
    discountLoading: {
      value: [{ type: "", name: "", code: "", mandatory: false }],
    },
    deductibles: { value: [{ name: "", code: "", mandatory: false }] },
    conditions: { value: [{ name: "", code: "", mandatory: false }] },
  },
};

export const getPlanMaster = {
  risk: [{ name: "Motor Commercial", code: "01" }],
  coversOptions: [
    { Code: "3106", name: "PA Benefit to Driver" },
    { Code: "3195", name: "Road Assistance" },
    { Code: "3103", name: "Agency Repair" },
    { Code: "3105", name: "Geographical Extension" },
    { Code: "3104", name: "Natural Calamity Cover" },
    { Code: "3196", name: "Replacement Car" },
    { Code: "3177", name: "Fire And Theft" },
    { Code: "3101", name: "Own Damage" },
    { Code: "3176", name: "Third party Bodily Injury / Death" },
    { Code: "3102", name: "Personal Accident Passenger" },
    { Code: "3178", name: "Third Party Property Damage" },
    { Code: "3338", name: "Political violence, terrorism and sabotage" },
    { Code: "3333", name: "Excess Buy backcover" },
    { Code: "3334", name: "Top up cover (Credit shortfall cover)" },
    { Code: "3331", name: "Riot And Strike" },
    { Code: "3179", name: "Comesa" },
    { Code: "3707", name: "Credit Protection Cover" },
    { Code: "100501", name: "Contingent Liability" },
  ],
  discountLoadingsOptions: [
    { Type: "D", Code: "4011", name: "Policy Discount" },
    { Type: "L", Code: "5011", name: "Policy Loading" },
    { Type: "L", Code: "5007", name: "Claim Loading" },
    { Type: "D", Code: "4005", name: "No Claim Bonus/Discount" },
    { Type: "D", Code: "4001", name: "Special Discount" },
    { Type: "D", Code: "4008", name: "LTA Discount" },
    { Type: "D", Code: "4020", name: "Large Volume Discount" },
    { Type: "D", Code: "4020", name: "Large Volume Discount" },
    { Type: "D", Code: "4008", name: "LTA Discount" },
    { Type: "D", Code: "4001", name: "Special Discount" },
    { Type: "D", Code: "4002", name: "General Discount" },
    { Type: "L", Code: "5001", name: "Special Loading" },
    { Type: "L", Code: "5004", name: "General Loading" },
    { Type: "D", Code: "4002", name: "General Discount" },
    { Type: "L", Code: "5001", name: "Special Loading" },
    { Type: "L", Code: "5004", name: "General Loading" },
    { Type: "L", Code: "5019", name: "Fronting FAC Fee" },
  ],
  deductiblesOptions: [
    { Type: "8", Code: "6668", name: "Time Excess" },
    { Type: "8", Code: "6666", name: "Driver under 21 years" },
    {
      Type: "8",
      Code: "6667",
      name: "Driver's License less than 2 years",
    },
    { Type: "8", Code: "1008004", name: "Explosion" },
    { Type: "8", Code: "6023", name: "Excess on % of Claim" },
    { Type: "8", Code: "6020", name: "Compulsory Excess" },
    { Type: "8", Code: "2008011", name: "Voluntary Deductible" },
  ],
  conditionsOptions: [
    {
      Type: "06",
      Code: "3",
      name: "04   Authorised Repair Limit [Section 1 - 4 (a)]",
    },
    { Type: "06", Code: "8", name: "01   Section 1 - 3" },
    { Type: "06", Code: "5", name: "02   Section II-1(a) and 2(a)" },
    { Type: "06", Code: "9", name: "03   Section II-1(b) and 2(b)" },
    {
      Type: "04",
      Code: "242",
      name: "1   For Terms and conditions refer the policy.",
    },
  ],
};
