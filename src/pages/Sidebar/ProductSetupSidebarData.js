const productSetupLinksData = [
    { label: 'Product Setup', link: '/productConfigurator', items: [
      { label: 'Attributes', link: '/productConfigurator/attributes' },
      { label: 'Discount & Loading', link: '/productConfigurator/discountLoading' },
      { label: 'Conditions', link: '/productConfigurator/conditions' },
      { label: 'Deductible', link: '/productConfigurator/deductible' },
      { label: 'Risk', link: '/productConfigurator/risk', items: [
        { label: 'Cover', link: '/productConfigurator/risk/cover' },
        { label: 'SMI', link: '/productConfigurator/risk/smi' },
        { label: 'Discount & Loading', link: '/productConfigurator/risk/discountLoading' },
        { label: 'Conditions', link: '/productConfigurator/risk/conditions' },
        { label: 'Deductible', link: '/productConfigurator/risk/deductible' }
      ] },
      { label: 'Rules', link: '/productConfigurator/rules' },
      { label: 'Charge', link: '/productConfigurator/charge' },
      { label: 'Rating', link: '/productConfigurator/rating' }
    ] }
  ];
  
  export default productSetupLinksData;
  