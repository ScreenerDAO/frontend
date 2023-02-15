interface ICompanyEthData {
    id: number
    name: string
    ticker: string
    dataHash: string
}

interface ICompanyData {
    id: number | null
    companyName: string
    ticker: string
    country: string
    // currency: number | null
    financialStatements: {
        [key: number | string]: IFinancialStatement
    },
    annualReports: {
        [key: number | string]: string 
    }
}

interface IStatement {
    [key: number]: IStatementElement
}

interface IStatementElement {
    value: string
    multipleValues: string[] | number[] | null
}

interface IFinancialStatement {
    balanceSheet: IStatement
    incomeStatement: IStatement
    cashFlow: IStatement
}

enum StatementType {
    BalanceSheet="balanceSheet",
    IncomeStatement="incomeStatement",
    CashFlowStatement="cashFlow"
}

export {
    StatementType
}

export type {
    ICompanyEthData,
    ICompanyData,
    IStatement,
    IFinancialStatement,
    IStatementElement
}