import { IBalanceSheet } from './BalanceSheetTypes'
import { ICashFlow } from './CashFlowTypes'
import { IIncomeStatement } from './IncomeStatementTypes'

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
    [key: number]: string
}

interface IFinancialStatement {
    // annualReportHash: string | null,
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
    IFinancialStatement 
}