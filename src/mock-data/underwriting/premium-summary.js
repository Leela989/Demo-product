import { Expand } from "@mui/icons-material";

export const premiumTableColumn = [
  { field: "expand", header: "" },
  { field: "premiumBreakup", header: "Premium Header" },
  { field: "currency", header: "Currency" },
  { field: "premiumTc", header: "Premium TC" },
  { field: "premiumLc", header: "Premium LC" },
];

export const commissionTableColumn = [
  { field: "expand", header: "" },
  { field: "commissionBreakup", header: "Commission Header" },
  { field: "currency", header: "Currency" },
  { field: "premiumTc", header: "Premium TC" },
  { field: "premiumLc", header: "Premium LC" },
];

export const premiumTableData = [
  {
    expand: "",
    premiumBreakup: "Sample-1",
    currency: "Sample-2",
    premiumTc: "Sample-3",
    premiumLc: "Sample-4",
    orders: [
      {
        premiumBreakup: "Sub-Sample-1",
        currency: "Sub-Sample-2",
        premiumTc: "Sub-Sample-3",
        premiumLc: "Sub-Sample-4",
      },
    ],
  },
];

export const commissionTableData = [
  {
    expand: "",
    commissionBreakup: "Sample-5",
    currency: "Sample-6",
    premiumTc: "Sample-7",
    premiumLc: "Sample-8",
    orders: [
      {
        commissionBreakup: "Sub-Sample-1",
        currency: "Sub-Sample-2",
        premiumTc: "Sub-Sample-3",
        premiumLc: "Sub-Sample-4",
      },
    ],
  },
];

export const installmentHeader = [
  { field: "currency", header: "Currency" },
  { field: "installmentNo", header: "Installment No" },
  { field: "installmentDate", header: "Installment Date" },
  { field: "precentage", header: "Percentage" },
  { field: "netAmountTc", header: "Net Amount TC" },
  { field: "netAmountLc", header: "Net Amount LC" },
  { field: "status", header: "Collection Status" },
  { field: "remark", header: "Remarks" },
];

export const installmentData = [
  {
    currency: "Sample-1",
    installmentNo: "Sample-2",
    installmentDate: "Sample-3",
    precentage: "Sample-4",
    netAmountTc: "Sample-5",
    netAmountLc: "Sample-6",
    status: "Sample-7",
    remark: "Sample-8",
  },
];
