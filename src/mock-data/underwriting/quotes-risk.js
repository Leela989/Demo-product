import Deductible from "../../pages/CreateApplicationForm/Product/Deductible/Deductible";

export const riskTableHeaderData = {
  riskMainData: {
    header: [
      { field: "id", header: "Risk Id", fieldType: "inputNumber" },
      { field: "type", header: "Risk Type", fieldType: "inputText" },
      {
        field: "effectiveFrom",
        header: "Effec. From Date",
        fieldType: "dateField",
      },
      {
        field: "effectiveTo",
        header: "Effec. To Date",
        fieldType: "dateField",
      },
      { field: "aoaLimit", header: "AOA Limit", fieldType: "inputNumber" },
      { field: "aoyLimit", header: "AOY Limit", fieldType: "inputNumber" },
      { field: "siCurrency", header: "SI Currency", fieldType: "inputNumber" },
      { field: "siTc", header: "SI TC", fieldType: "inputNumber" },
      { field: "siLc", header: "SI LC", fieldType: "inputNumber" },
      { field: "preCurrency", header: "Pre. Currency", fieldType: "dropDown" },
      { field: "premTc", header: "Prem. TC", fieldType: "inputNumber" },
      { field: "premLc", header: "Prem. LC", fieldType: "inputNumber" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
};

export const initialriskValueData = {
  id: "",
  type: "",
  effectiveFrom: "",
  effectiveTo: "",
  aoaLimit: "",
  aoyLimit: "",
  siCurrency: "",
  siTc: "",
  siLc: "",
  preCurrency: "",
  premTc: "",
  premLc: "",
};

export const riskValueData = {
  riskMainData: {
    value: [
      {
        id: "",
        type: "",
        effectiveFrom: "",
        effectiveTo: "",
        aoaLimit: "",
        aoyLimit: "",
        siCurrency: "",
        siTc: "",
        siLc: "",
        preCurrency: "",
        premTc: "",
        premLc: "",
      },
    ],
  },
};

export const riskTabTableHeader = {
  covers: {
    header: [
      { field: "code", header: "Code", fieldType: "dropDown" },
      {
        field: "description",
        header: "Description",
        fieldType: "inputTextarea",
      },
      { field: "siTC", header: "Si TC", fieldType: "inputNumber" },
      { field: "siLC", header: "Si LC", fieldType: "inputNumber" },
      { field: "rate", header: "Rate", fieldType: "inputNumber" },
      { field: "ratePer", header: "Rate Per", fieldType: "inputNumber" },
      { field: "premTC", header: "Prem TC", fieldType: "inputNumber" },
      { field: "permLC", header: "Perm LC", fieldType: "inputNumber" },
      {
        field: "effectiveFromDate",
        header: "Effective From Date",
        fieldType: "dateField",
      },
      {
        field: "effectiveToDate",
        header: "Effective To Date",
        fieldType: "dateField",
      },
      { field: "addSI", header: "Add SI", fieldType: "checkBox" },
      { field: "addRI", header: "Add RI", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
  discountLoading: {
    header: [
      { field: "code", header: "Code", fieldType: "dropDown" },
      {
        field: "description",
        header: "Description",
        fieldType: "inputTextarea",
      },
      { field: "rate", header: "Rate", fieldType: "inputNumber" },
      { field: "ratePer", header: "Rate Per", fieldType: "inputNumber" },
      { field: "amountTc", header: "Amount TC", fieldType: "inputNumber" },
      { field: "amountLc", header: "Amount LC", fieldType: "inputNumber" },
      { field: "order", header: "Canscade Order", fieldType: "inputNumber" },
      { field: "appliedOn", header: "Applied On", fieldType: "dateField" },
      {
        field: "brokerCommApplication",
        header: "Broker Comm. Application",
        fieldType: "checkBox",
      },
      { field: "ncb", header: "NCB Yes / No", fieldType: "checkBox" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
  deductible: {
    header: [
      { field: "code", header: "Code", fieldType: "dropDown" },
      {
        field: "description",
        header: "Description",
        fieldType: "inputTextarea",
      },
      {
        field: "deductible",
        header: "Deductible Type",
        fieldType: "inputNumber",
      },
      { field: "percentage", header: "%", fieldType: "inputNumber" },
      { field: "amountFc", header: "Amount FC", fieldType: "inputNumber" },
      { field: "amountTc", header: "Amount TC", fieldType: "inputNumber" },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
  conditions: {
    header: [
      { field: "code", header: "Code", fieldType: "dropDown" },
      {
        field: "description",
        header: "Description",
        fieldType: "inputTextarea",
      },
      {
        field: "longDescription1",
        header: "Long Description 1",
        fieldType: "inputTextarea",
      },
      {
        field: "longDescription2",
        header: "Long Description 2",
        fieldType: "inputTextarea",
      },
      {
        field: "conditionType",
        header: "Condition Type",
        fieldType: "inputText",
      },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
  smi: {
    header: [
      { field: "code", header: "Code", fieldType: "dropDown" },
      {
        field: "description",
        header: "Description",
        fieldType: "inputTextarea",
      },
      { field: "siTc", header: "Sum Insured TC", fieldType: "inputText" },
      { field: "siLc", header: "Sum Insured LC", fieldType: "inputText" },
      { field: "rate", header: "Rate", fieldType: "inputNumber" },
      { field: "premiumTc", header: "Premium TC", fieldType: "inputText" },
      { field: "deposite", header: "Deposite %", fieldType: "inputNumber" },
      {
        field: "effectiveFromDate",
        header: "Effective From Date",
        fieldType: "dateField",
      },
      {
        field: "effectiveToDate",
        header: "Effective From Date",
        fieldType: "dateField",
      },
      { field: "save", header: "" },
      { field: "action", header: "" },
    ],
  },
};

export const riskTabTablecontent = {
  covers: {
    value: [
      {
        code: "",
        description: "",
        siTC: "",
        siLC: "",
        rate: "",
        ratePer: "",
        premTC: "",
        permLC: "",
        effectiveFromDate: "",
        effectiveToDate: "",
        addSI: false,
        addRI: false,
      },
    ],
  },
  discountLoading: {
    value: [
      {
        code: "",
        description: "",
        rate: "",
        ratePer: "",
        amountTc: "",
        amountLc: "",
        order: "",
        appliedOn: "",
        brokerCommApplication: "",
        ncb: "",
      },
    ],
  },
  deductible: {
    value: [
      {
        code: "",
        description: "",
        deductible: "",
        percentage: "",
        amountFc: "",
        amountTc: "",
      },
    ],
  },
  conditions: {
    value: [
      {
        code: "",
        description: "",
        longDescription1: "",
        longDescription2: "",
        conditionType: "",
      },
    ],
  },
  smi: {
    value: [
      {
        code: "",
        description: "",
        siTc: "",
        siLc: "",
        rate: "",
        premiumTc: "",
        deposite: "",
        effectiveFromDate: "",
        effectiveToDate: "",
      },
    ],
  },
};

export const riskEditTabTablecontent = {
  key: 76402,
  covers: {
    value: [
      {
        code: "3176",
        description: "Third party Bodily Injury / Death ",
        siTC: 0,
        siLC: 0,
        rate: 0,
        ratePer: 100,
        premTC: 100000,
        permLC: 1000,
        effectiveFromDate: "20/05/2024 00:00:00",
        effectiveToDate: "10/05/2025 23:59:00",
      },
      {
        code: "3103",
        description: "Agency Repair",
        siTC: null,
        siLC: null,
        rate: null,
        ratePer: 100,
        premTC: 0,
        permLC: 0,
        effectiveFromDate: "21/05/2024 00:00:00",
        effectiveToDate: "11/05/2025 21:59:00",
      },
      {
        code: "3104",
        description: "Natural Calamity Cover",
        siTC: null,
        siLC: null,
        rate: null,
        ratePer: 100,
        premTC: 0,
        permLC: 0,
        effectiveFromDate: "22/05/2024 00:00:00",
        effectiveToDate: "12/05/2025 20:59:00",
      },
      {
        code: "3196",
        description: "Replacement Car",
        siTC: null,
        siLC: null,
        rate: null,
        ratePer: 100,
        premTC: 0,
        permLC: 0,
        effectiveFromDate: "23/05/2024 00:00:00",
        effectiveToDate: "13/05/2025 19:59:00",
      },
      {
        code: "3195",
        description: "Road Assistance",
        siTC: null,
        siLC: null,
        rate: null,
        ratePer: 100,
        premTC: 0,
        permLC: 0,
        effectiveFromDate: "24/05/2024 00:00:00",
        effectiveToDate: "13/05/2025 18:59:00",
      },
      {
        code: "3106",
        description: "PA Benefit to Driver",
        siTC: null,
        siLC: null,
        rate: null,
        ratePer: 1,
        premTC: 0,
        permLC: 0,
        effectiveFromDate: "25/05/2024 00:00:00",
        effectiveToDate: "14/05/2025 17:59:00",
      },
    ],
  },
  discountLoading: {
    value: [
      {
        code: "5007",
        description: "Claim Loading",
        type: "L",
        rate: null,
        ratePer: 100,
        amountTc: 0,
        amountLc: 0,
        cascadeOrder: null,
        appliedOn: null,
        brokerCommApplication: "1",
      },
      {
        code: "4005",
        description: "No Claim Bonus/Discount",
        type: "D",
        rate: null,
        ratePer: 100,
        amountTc: 0,
        amountLc: 0,
        cascadeOrder: null,
        appliedOn: null,
        brokerCommApplication: "1",
      },
      {
        code: "4001",
        description: "Special Discount",
        type: "D",
        rate: null,
        ratePer: 100,
        amountTc: 0,
        amountLc: 0,
        cascadeOrder: null,
        appliedOn: null,
        brokerCommApplication: "1",
      },
    ],
  },
  deductible: {
    value: [
      {
        code: "",
        description: "",
        deductible: "",
        percentage: "",
        amountFc: "",
        amountTc: "",
      },
    ],
  },
  conditions: {
    value: [
      {
        code: "",
        description: "",
        longDescription1: "",
        longDescription2: "",
        conditionType: "",
      },
    ],
  },
  smi: {
    value: [
      {
        code: "",
        description: "",
        siTc: "",
        siLc: "",
        rate: "",
        premiumTc: "",
        deposite: "",
        effectiveFromDate: "",
        effectiveToDate: "",
      },
    ],
  },
};
