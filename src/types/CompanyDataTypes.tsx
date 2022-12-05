import { IBalanceSheet } from './BalanceSheetTypes'
import { ICashFlow } from './CashFlowTypes'
import { IIncomeStatement } from './IncomeStatementTypes'

interface ICompanyEthData {
    id: number
    name: string
    ticker: string
    country: string
    dataHash: string
}

interface ICompanyData {
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