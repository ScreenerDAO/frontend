import { IBalanceSheet } from './BalanceSheetTypes'
import { ICashFlow } from './CashFlowTypes'
import { IIncomeStatement } from './IncomeStatementTypes'

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
    ICompanyData,
    IFinancialStatement 
}