interface IIncomeStatement {
    Revenue: number
    CostGoodsSold: number
    GrossProfit: number
    SellingGeneralAndAdministrativeExpenses: number
    DepreciationAndAmortization: number
    OtherOperatingExpenses: number
    OperatingIncome: number
    InterestExpense: number
    InterestIncome: number
    OtherNonOperatingIncomeExpenses: number
    EarningsBeforeTaxes: number
    IncomeTaxExpense: number
    NetIncome: number
}

const IncomeStatementOrderedElements = [
    {key: 'Revenue', description: 'Revenue'},
    {key: 'CostGoodsSold', description: 'Cost of goods sold'},
    {key: 'GrossProfit', description: 'Gross profit'},
    {key: 'SellingGeneralAndAdministrativeExpenses', description: 'Selling, general and administrative expenses'},
    {key: 'DepreciationAndAmortization', description: 'Depreciation and amortization'},
    {key: 'OtherOperatingExpenses', description: 'Other operating expenses'},
    {key: 'OperatingIncome', description: 'Operating income'},
    {key: 'InterestExpense', description: 'Interest expense'},
    {key: 'InterestIncome', description: 'Interest income'},
    {key: 'OtherNonOperatingIncomeExpenses', description: 'Other non operating income (expenses)'},
    {key: 'EarningsBeforeTaxes', description: 'Earnings before taxes'},
    {key: 'IncomeTaxExpense', description: 'Income tax expense'},
    {key: 'NetIncome', description: 'Net income'}
]

export type {
    IIncomeStatement
}

export {
    IncomeStatementOrderedElements
}