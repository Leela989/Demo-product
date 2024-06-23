export const premiumData = {
  header: [
    { field: "premiumBreakup", header: "Premium Breakup" },
    { field: "currency", header: "Currency" },
    { field: "premiumTc", header: "Premium TC" },
    { field: "premiumLc", header: "Premium LC" },
  ],
  data: [
    {
      id: "p-01",
      premiumBreakup: "Base Premium",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "p-02",
          premiumBreakup: "q",
          currency: "qq",
          premiumTc: "qqqq",
          premiumLc: "qqqq",
          parent_id: 'p-01',
          subdata: [
            {
              id: "p-03",
              premiumBreakup: "asd",
              currency: "asd",
              premiumTc: "asd",
              premiumLc: "asd",
              parent_id: 'p-02',
            },
            {
              id: "p-04",
              premiumBreakup: "asd",
              currency: "asd",
              premiumTc: "asd",
              premiumLc: "asd",
              parent_id: 'p-02',
            },
          ],
        },
        {
          id: "p-05",
          premiumBreakup: "q",
          currency: "qq",
          premiumTc: "qqqq",
          premiumLc: "qqqq",
          parent_id: 'p-01',
        },
      ],
    },
    {
      id: "d-01",
      premiumBreakup: "Discount",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "d-02",
          premiumBreakup: "sub-Discount",
          currency: "USD",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'd-01',
        },
      ],
    },
    {
      id: "l-01",
      premiumBreakup: "Loading",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "l-02",
          premiumBreakup: "sub-Loading",
          currency: "sub-Currency",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'd-01',
        },
      ],
    },
    {
      id: "n-01",
      premiumBreakup: "Net Premium",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
    },
    {
      id: "c-01",
      premiumBreakup: "Charges",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "l-02",
          premiumBreakup: "sub-Charges",
          currency: "sub-Currency",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'd-01',
        },
      ],
    },
    {
      id: "o-01",
      premiumBreakup: "Output Tax (Premium Tax)",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "o-02",
          premiumBreakup: "sub-Output Tax (Premium Tax)",
          currency: "sub-Currency",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'd-01',
        },
      ],
    },
    {
      id: "pp-01",
      premiumBreakup: "Premium Payable",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "pp-02",
          premiumBreakup: "sub-Premium Payable",
          currency: "sub-Currency",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'd-01',
        },
      ],
    },
  ],
};

export const commissionData = {
  header: [
    { field: "commissionBreakup", header: "Commission Breakup" },
    { field: "currency", header: "Currency" },
    { field: "premiumTc", header: "Premium TC" },
    { field: "premiumLc", header: "Premium LC" },
  ],
  data: [
    {
      id: "cc-01",
      commissionBreakup: "Commission",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "cc-02",
          commissionBreakup: "sub-Commission",
          currency: "sub-Currency",
          premiumTc: "10.00",
          premiumLc: "10.00",
          parent_id: 'cc-01',
          subdata: [
            {
              id: "cc-03",
              commissionBreakup: "sub-sub-Commission",
              currency: "sub-sub-Currency",
              premiumTc: "4.00",
              premiumLc: "4.00",
              parent_id: 'cc-02',
            },
            {
              id: "cc-04",
              commissionBreakup: "sub-sub-Commission",
              currency: "sub-sub-Currency",
              premiumTc: "6.00",
              premiumLc: "6.00",
              parent_id: 'cc-02',
            },
          ],
        },
        {
          id: "cc-05",
          commissionBreakup: "sub-Commission",
          currency: "sub-Currency",
          premiumTc: "20.00",
          premiumLc: "20.00",
          parent_id: 'cc-01',
        },
      ],
    },
    {
      id: "it-01",
      commissionBreakup: "Input tax (Commission Tax)",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "it-02",
          commissionBreakup: "sub-Discount",
          currency: "USD",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'it-01',
        },
      ],
    },
    {
      id: "nc-01",
      commissionBreakup: "Net Commission",
      currency: "USD",
      premiumTc: "30.00",
      premiumLc: "30.00",
      subdata: [
        {
          id: "nc-02",
          commissionBreakup: "sub-Loading",
          currency: "sub-Currency",
          premiumTc: "30.00",
          premiumLc: "30.00",
          parent_id: 'nc-01',
        },
      ],
    },
  ],
};

export const installmentHeader = [
  { field: "currency", header: "Currency" },
  { field: "installmentNo", header: "Installment No" },
  { field: "installmentDate", header: "Installment Date" },
  { field: "precentage", header: "Percentage" },
  { field: "netAmountTc", header: "Net Amount TC" },
  { field: "netAmountLc", header: "Net Amount LC" },
  { field: "status", header: "Collection Status" },
  { field: "remark", header: "Remarks" },
  // { field: "save", header: "" },
  // { field: "action", header: "" },
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
