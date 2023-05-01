import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyData from 'src/types/ICompanyData'
import IFinancialStatement from 'src/types/IFinancialStatement'
import IStatementElement from 'src/types/IStatementElement'
import { StatementType } from 'src/types/IStatement'

// Define the initial state using that type
const initialState: ICompanyData = {
    id: null,
    companyName: "",
    ticker: "",
    country: "",
    wikipediaPage: undefined,
    isin: undefined,
    currency: undefined,
    isDelisted: false,
    financialStatements: {},
    annualReports: {}
}

export const newCompanyDataSlice = createSlice({
    name: 'newCompanyData',
    initialState,
    reducers: {
        setCompanyData: (state, action: PayloadAction<ICompanyData>) => {
            state.id = action.payload.id
            state.companyName = action.payload.companyName
            state.ticker = action.payload.ticker
            state.country = action.payload.country
            state.wikipediaPage = action.payload.wikipediaPage
            state.isin = action.payload.isin
            state.currency = action.payload.currency
            state.isDelisted = action.payload.isDelisted
            state.financialStatements = action.payload.financialStatements ?? {}
            state.annualReports = action.payload.annualReports ?? {}
        },
        setCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload
        },
        setCompanyTicker: (state, action: PayloadAction<string>) => {
            state.ticker = action.payload
        },
        setCompanyCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload
        },
        setCompanyWikipediaPage: (state, action: PayloadAction<string>) => {
            state.wikipediaPage = action.payload
        },
        setCompanyIsin: (state, action: PayloadAction<string>) => {
            state.isin = action.payload
        },        
        setCompanyCurrency: (state, action: PayloadAction<number>) => {
            state.currency = action.payload
        },
        setCompanyIsDelisted: (state, action: PayloadAction<boolean>) => {
            state.isDelisted = action.payload
        },
        addNewYear: (state, action: PayloadAction<number | string>) => {
            state.financialStatements[action.payload] = {
                balanceSheet: {} ,
                incomeStatement: {},
                cashFlow: {}
            }
        },
        setAnnualReportHash: (state, action: PayloadAction<{year: number | string, hash: string}>) => {
            if (action.payload.hash == "") {
                const annualReports = state.annualReports

                delete annualReports[action.payload.year]

                state.annualReports = annualReports
            }
            else {
                state.annualReports[action.payload.year] = action.payload.hash
            }            
        },
        setStatementElement: (state, action: PayloadAction<{year: number | string, statement: StatementType, element: number, value: IStatementElement}>) => {
            
            // state.financialStatements[action.payload.year]["fds" as keyof IFinancialStatement][action.payload.element] = action.payload.value
            state.financialStatements[action.payload.year][action.payload.statement as keyof IFinancialStatement][action.payload.element] = action.payload.value
        },
        deleteYear: (state, action: PayloadAction<number | string>) => {
            const financialStatements = state.financialStatements
            const annualReports = state.annualReports

            delete financialStatements[action.payload]
            delete annualReports[action.payload]

            state.financialStatements = financialStatements
            state.annualReports = annualReports
        }
    },
})

export const { 
    setCompanyData, 
    setCompanyName, 
    setCompanyCountry, 
    setCompanyTicker,
    setCompanyWikipediaPage,
    setCompanyIsin,
    setCompanyCurrency,
    setCompanyIsDelisted,
    addNewYear,
    setAnnualReportHash,
    setStatementElement,
    deleteYear
} = newCompanyDataSlice.actions

export {
    initialState
}

export default newCompanyDataSlice.reducer
