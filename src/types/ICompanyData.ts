import IFinancialStatement from "./IFinancialStatement"

export default interface ICompanyData {
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