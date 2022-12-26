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
    financialStatements: {
        [key: number]: IFinancialStatement
    }
}

interface IFinancialStatement {
    annualReportHash: string | null,
    balanceSheet: IBalanceSheet | null
    incomeStatement: IIncomeStatement | null
    cashFlow: ICashFlow | null
}

export type {
    ICompanyEthData,
    ICompanyData,
    IFinancialStatement 
}