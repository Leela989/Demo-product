const linksData = [
    { 
        label: 'My Tasks', 
        link: '/tasks',
      },
    { 
      label: 'Underwriting', 
      subLinks: [
        {
          label: "Masters",
          subLinks: [
            { label: "Cover Note Master", link: "/underwriting/masters/coverNoteMaster" },
            { label: "Certificate Book Master", link: "/underwriting/masters/certificateBookMaster" },
            { label: "Codes Master", link: "/underwriting/masters/codesMaster" }
          ]
        },
        {
          label: "Proposal",
          subLinks: [
            { label: "Motor", link: "/underwriting/proposal/motor"},
            { label: "Fire", link: "/underwriting/proposal/fire"},
            { label: "Marine", subLinks: [
              {label: "Direct", link: "/underwriting/proposal/marine/direct"},
              {label: "Open Cover", link: "/underwriting/proposal/marine/overCover"},
              {label: "Certificate", link: "/underwriting/proposal/marine/direct"},
              {label: "Open Policy", link: "/underwriting/proposal/marine/openPolicy"},
              {label: "Declaration", link: "/underwriting/proposal/marine/declaration"},

            ]},
            { label: "Engineering", link: "/underwriting/proposal/engineering"},
            { label: "Miscellaneous", link: "/underwriting/proposal/miscellaneous"},
            { label: "Liability", link: "/underwriting/proposal/liability" },
            { label: "Bonds", link: "/underwriting/proposal/bonds" },
            { label: "Aviation", link: "/underwriting/proposal/aviation" },
            { label: "Agriculture", link: "/underwriting/proposal/agriculture" },
            { label: "Package", link: "/underwriting/proposal/package" }
          ]
        },
        {
          label: "Quotation",
          subLinks: [
            { label: "Motor", link: "/underwriting/quotation/motor" },
            { label: "Fire", link: "/underwriting/quotation/fire" },
            { label: "Marine", subLinks: [
              {label: "Direct", link: "/underwriting/quotation/marine/direct"},
              {label: "Open Cover", link: "/underwriting/quotation/marine/overCover"},
              {label: "Certificate", link: "/underwriting/quotation/marine/direct"},
              {label: "Open Policy", link: "/underwriting/quotation/marine/openPolicy"},
              {label: "Declaration", link: "/underwriting/quotation/marine/declaration"},

            ]},
            { label: "Engineering", link: "/underwriting/quotation/engineering" },
            { label: "Miscellaneous", link: "/underwriting/quotation/miscellaneous" },
            { label: "Liability", link: "/underwriting/quotation/liability" },
            { label: "Bonds", link: "/underwriting/quotation/bonds" },
            { label: "Aviation", link: "/underwriting/quotation/aviation" },
            { label: "Agriculture", link: "/underwriting/quotation/agriculture" },
            { label: "Package", link: "/underwriting/quotation/package" }
          ]
        },
        {
          label: "Policy",
          subLinks: [
            { label: "Motor", link: "/underwriting/policy/motor" },
            { label: "Fire", link: "/underwriting/policy/fire" },
            { label: "Fire Declaration", link: "/underwriting/policy/fireDeclaration" },
            { label: "Marine",  subLinks: [
              {label: "Direct", link: "/underwriting/policy/marine/direct"},
              {label: "Open Cover", link: "/underwriting/policy/marine/overCover"},
              {label: "Certificate", link: "/underwriting/policy/marine/direct"},
              {label: "Open Policy", link: "/underwriting/policy/marine/openPolicy"},
              {label: "Declaration", link: "/underwriting/policy/marine/declaration"},

            ]},
            { label: "Engineering", link: "/underwriting/policy/engineering" },
            { label: "Miscellaneous", link: "/underwriting/policy/miscellaneous" },
            { label: "Liability", link: "/underwriting/policy/liability" },
            { label: "Bonds", link: "/underwriting/policy/bonds" },
            { label: "Aviation", link: "/underwriting/policy/aviation" },
            { label: "Agriculture", link: "/underwriting/policy/agriculture" },
            { label: "Package", link: "/underwriting/policy/package" }
          ]
        },
        {
          label: "Query",
          subLinks: [
            { label: "Customer Zoom Query", link: "/underwriting/query/customerZoomQuery" },
            { label: "Risk Query", link: "/underwriting/query/riskQuery" },
            { label: "Vehicle Query", link: "/underwriting/query/vehicleQuery" },
            { label: "Open Policy Query", link: "/underwriting/query/openPolicyQuery" }
          ]
        },
        {
          label: "Process",
          subLinks: [
            { label: "Bulk Policy Approval", link: "/underwriting/process/bulkPolicyApproval" },
            { label: "Bulk Open Cover Certificate Approval", link: "/underwriting/process/bulkOpenCoverCertificateApproval" },
            { label: "Lapsation Processing", link: "/underwriting/process/lapsationProcessing" },
            { label: "UPR Processing", link: "/underwriting/process/uprProcessing" },
            { label: "Bulk Quotation Conversion", link: "/underwriting/process/bulkQuotationConversion" },
            { label: "Bulk Renewal Processing", link: "/underwriting/process/bulkRenewalProcessing" },
            { label: "Bulk Agency Commission Accounting Process", link: "/underwriting/process/bulkAgencyCommissionAccountingProcess" }
          ]
        }
      ]
    }
  ];
  
  export default linksData;
  