const linksData = [
    { 
      label: 'My Tasks', 
      link: '/tasks',
    },
    { 
      label: 'User Management', 
      subLinks: [
        { label: 'User Master', link: '/userManagement/userMaster' },
        { label: 'User Group Mapping', link: '/userManagement/userGroupMapping' },
        { label: 'User Authorisation setup', link: '/userManagement/userAuthorisationSetup' }
      ]
    },
    { 
      label: 'Menu Management', 
      subLinks: [
        { label: 'Menu Creation', link: '/menuManagement/menuCreation' },
        { label: 'Menu Parameter Mapping', link: '/menuManagement/menuParameterMapping' },
        { label: 'Menu User Privilege Setup', link: '/menuManagement/menuUserPrivilegeSetup' }
      ]
    },
    { 
      label: 'Party Management', 
      subLinks: [
        { label: 'Party Role Master', link: '/partyManagement/partyRoleMaster' },
        { label: 'Party Master', link: '/partyManagement/partyMaster' },
        { label: 'Heirarchy Master', link: '/partyManagement/heirarchyMaster' },
        { label: 'Agency Commission Setup', link: '/partyManagement/agencyCommissionSetup' }
      ]
    },
    { 
      label: 'Common Master', 
      subLinks: [
        { label: 'Company Master', link: '/commonMaster/companyMaster' },
        { label: 'Branch Master', link: '/commonMaster/branchMaster' },
        { label: 'Department Master', link: '/commonMaster/departmentMaster' },
        { label: 'Division Master', link: '/commonMaster/divisionMaster' },
        { label: 'Currency & Exchange Rate', link: '/commonMaster/currencyExchangeRateMaster' },
        { label: 'Installment Pay Setup Master', link: '/commonMaster/installmentPaySetupMaster' },
        { label: 'VAT/TAX Master', link: '/commonMaster/vatTaxMaster' },
        { label: 'Checklist Master', link: '/commonMaster/checklistMaster' },
        { label: 'Codes Master', link: '/commonMaster/codesMaster' }
      ]
    },
    { 
      label: 'Product Configurator', 
      subLinks: [
        { label: "Line Of Business", link: "/productConfigurator/lineofbusiness" },
        { 
          label: "Product Master", 
          subLinks: [
            { label: 'Cover Master', link: '/productConfigurator/productMaster/coverMaster' },
            { label: 'Cover Group', link: '/productConfigurator/productMaster/coverGroup' },
            { label: 'Discount Master', link: '/productConfigurator/productMaster/discountMaster' },
            { label: 'Loading Master', link: '/productConfigurator/productMaster/loadingMaster' },
            { label: 'Vehicle Matrix', link: '/productConfigurator/productMaster/vehicleMatrix' },
            { label: 'Installment Pay Setup Master', link: '/productConfigurator/productMaster/installmentPaySetupMaster' },
            { label: 'SMI Group Master', link: '/productConfigurator/productMaster/smiGroupMaster' },
            { label: 'Vehicle Query Mapping', link: '/productConfigurator/productMaster/vehicleQueryMapping' },
            { label: 'SMI Master (Codes master)', link: '/productConfigurator/productMaster/smiMaster' },
            { label: 'Condition Master (Codes master)', link: '/productConfigurator/productMaster/conditionMaster' },
            { label: 'Deductible Master (Codes master)', link: '/productConfigurator/productMaster/deductibleMaster' }
          ]
        },
        { label: "Product Setup", link: "/productSetup" },
        { label: "Plan/Scheme Master", link: "/plan" }
      ] 
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
            { label: "Motor", link: "/underwriting/proposal/motor", code: '10' },
            { label: "Fire", link: "/underwriting/proposal/fire", code: '11' },
            { label: "Marine", link: "/underwriting/proposal/marine", code: '12' },
            { label: "Engineering", link: "/underwriting/proposal/engineering", code: '13' },
            { label: "Miscellaneous", link: "/underwriting/proposal/miscellaneous", code: '14' },
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
            { label: "Marine", link: "/underwriting/quotation/marine" },
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
            { label: "Marine", link: "/underwriting/policy/marine" },
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
    },
    { 
      label: 'Policy Servicing', 
      subLinks: [
        { label: "Endorsement", link: "/policyServicing/endorsement" },
        { label: "Endorsement Query", link: "/policyServicing/endorsementQuery" }
      ]
    }
  ];
  
  export default linksData;
  