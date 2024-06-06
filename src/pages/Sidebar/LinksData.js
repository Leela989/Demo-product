const linksData = [
    { label: 'My Tasks', link: '/tasks' },
    { label: 'User Management', link: '/userManagement' },
    { label: 'Menu Management', link: '/menuManagement' },
    { label: 'Party Management', link: '/partyManagement' },
    { label: 'Common Master', link: '/commonMaster' },
    { label: 'Product Configurator', subLinks:[
      {label:"Line Of Business", link:"/productConfigurator/LineOfBusiness"},
      {label:"Product Setup", link:"/productSetup"}
    ] },
    { label: 'Underwriting', link: '/underwriting' },
    { label: 'Policy Servicing', link: '/policyServicing' },
    { label: 'Renewal', link: '/renewal' },
    { label: 'Client Management', link: '/clientManagement' },
    { label: 'Reinsurance', link: '/reinsurance' },
    { label: 'GL', link: '/gl' }
  ];
  
  export default linksData;
  