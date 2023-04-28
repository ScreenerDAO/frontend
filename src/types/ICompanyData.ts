import IFinancialStatement from "./IFinancialStatement"

export default interface ICompanyData {
    id: number | null
    companyName: string
    ticker: string
    country: string
    wikipediaPage?: string
    isin?: string
    currency?: number
    financialStatements: {
        [key: number | string]: IFinancialStatement
    },
    annualReports: {
        [key: number | string]: string 
    }
}