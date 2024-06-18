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
      { field: "description", header: "Description", fieldType: "inputText" },
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
      { field: "description", header: "Description", fieldType: "inputText" },
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
      { field: "description", header: "Description", fieldType: "inputText" },
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
      { field: "description", header: "Description", fieldType: "inputText" },
      {
        field: "longDescription1",
        header: "Long Description 1",
        fieldType: "inputText",
      },
      {
        field: "longDescription2",
        header: "Long Description 2",
        fieldType: "inputText",
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
      { field: "description", header: "Description", fieldType: "inputText" },
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
