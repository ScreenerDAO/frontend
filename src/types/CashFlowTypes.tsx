interface ICashFlow {
    NetIncome: number
    OtherOperatingActivities: number
    CashFromOperations: number
    OtherInvestingActivities: number
    CashFromInvesting: number
    CommonDividendsPaid: number
    RepurchaseOfCommonStock: number
    IssuanceOfCommonStock: number
    OtherFinancingActivities: number
    CashFromFinancing: number
    NetChangeCash: number
}

const CashFlowOrderedElements = [
    {key: 'NetIncome', description: 'Net income'},
    {key: 'OtherOperatingActivities', description: 'Other operating activities'},
    {key: 'CashFromOperations', description: 'Cash from operations'},
    {key: 'OtherInvestingActivities', description: 'Other investing activities'},
    {key: 'CashFromInvesting', description: 'Cash from investing'},
    {key: 'CommonDividendsPaid', description: 'Common dividends paid'},
    {key: 'RepurchaseOfCommonStock', description: 'Repurchase of common stock'},
    {key: 'IssuanceOfCommonStock', description: 'Issuance of common stock'},
    {key: 'OtherFinancingActivities', description: 'Other financing activities'},
    {key: 'CashFromFinancing', description: 'Cash from financing'},
    {key: 'NetChangeCash', description: 'Net change in cash'}
]

export type {
    ICashFlow
}

export {
    CashFlowOrderedElements
}