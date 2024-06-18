export const approvalFieldData = [
    {
        name: 'approvalDate',
        label: 'Approval date',
        field_type: 'dateField'
    },
    {
        name: 'accountingDate',
        label: 'Accounting date',
        field_type: 'dateField'
    },
    {
        name: 'document',
        label: 'Net off document for broker Yes/No',
        field_type: 'checkBox'
    },
    {
        name: 'customerAccountType',
        label: 'Customer A/C Type',
        field_type: 'dropDown'
    },
    {
        name: 'brokerAccountType',
        label: 'Broker A/C Type',
        field_type: 'dropDown'
    },
    {
        name: 'surveyorAccountType',
        label: 'Surveyor A/C Type',
        field_type: 'dropDown'
    }
]

export const approvalData = {
    approvalDate: '',
    accountingDate: '',
    document: '',
    customerAccountType: '',
    brokerAccountType: '',
    surveyorAccountType: '',
}