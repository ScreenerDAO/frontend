interface IBalanceSheet {
    TotalAssets: number
    TotalCurrentAssets: number
    CashAndEquivalents: number
    Inventory: number
    OtherCurrentAssets: number
    TotalNonCurrentAssets: number
    PropertyPlantAndEquipment: number
    AccumulatedDepreciation: number
    LongTermInvestments: number
    Goodwill: number
    OtherNonCurrentAssets: number
    TotalLiabilities: number
    TotalCurrentLiabilities: number
    AccountsPayable: number
    ShortTermDebt: number
    OtherCurrentLiabilities: number
    TotalNonCurrentLiabilities: number
    LongTermDebt: number
    CapitalLeases: number
    OtherNonCurrentLiabilities: number
    TotalEquity: number
    CommonStock: number
    AdditionalPaidInCapital: number
    RetainedEarnings: number    
    MinorityInterest: number
}

const BalanceSheetOrderedElements = [
    {key: 'TotalAssets', description: 'Total assets'},
    {key: 'TotalCurrentAssets', description: 'Total current assets'},
    {key: 'CashAndEquivalents', description: 'Cash and equivalents'},
    {key: 'Inventory', description: 'Inventory'},
    {key: 'OtherCurrentAssets', description: 'Other current assets'},
    {key: 'TotalNonCurrentAssets', description: 'Total non current assets'},
    {key: 'PropertyPlantAndEquipment', description: 'Property plant and equipment'},
    {key: 'AccumulatedDepreciation', description: 'Accumulated depreciation'},
    {key: 'LongTermInvestments', description: 'Long term investments'},
    {key: 'Goodwill', description: 'Goodwill'},
    {key: 'OtherNonCurrentAssets', description: 'Other non current assets'},
    {key: 'TotalLiabilities', description: 'Total liabilities'},
    {key: 'TotalCurrentLiabilities', description: 'Total current liabilities'},
    {key: 'AccountsPayable', description: 'Accounts payable'},
    {key: 'ShortTermDebt', description: 'Short term debt'},
    {key: 'OtherCurrentLiabilities', description: 'Other current liabilities'},
    {key: 'TotalNonCurrentLiabilities', description: 'Total non current liabilities'},
    {key: 'LongTermDebt', description: 'Long term debt'},
    {key: 'CapitalLeases', description: 'Capital leases'}, 
    {key: 'OtherNonCurrentLiabilities', description: 'Other non current liabilities'},
    {key: 'TotalEquity', description: 'Total equity'},
    {key: 'CommonStock', description: 'Common stock'},
    {key: 'AdditionalPaidInCapital', description: 'Additional paid in capital'},
    {key: 'RetainedEarnings', description: 'Retained earnings'},    
    {key: 'MinorityInterest', description: 'Minority interest'}
]

export type {
    IBalanceSheet
}

export {
    BalanceSheetOrderedElements
}