import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBalanceSheet } from 'src/types/BalanceSheetTypes'
import { ICashFlow } from 'src/types/CashFlowTypes'
import { ICompanyData, IFinancialStatement, IStatement, StatementType } from 'src/types/CompanyDataTypes'
import { IIncomeStatement } from 'src/types/IncomeStatementTypes'

// Define the initial state using that type
const initialState: ICompanyData = {
    id: null,
    companyName: "",
    ticker: "",
    country: "",
    // currency: null,
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
            // state.currency = action.payload.currency
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
        // setCompanyCurrency: (state, action: PayloadAction<number>) => {
        //     state.currency = action.payload
        // },
        addNewYear: (state, action: PayloadAction<number>) => {
            state.financialStatements[action.payload] = {
                balanceSheet: {} ,
                incomeStatement: {},
                cashFlow: {}
            }
        },
        setAnnualReportHash: (state, action: PayloadAction<{year: number, hash: string}>) => {
            if (action.payload.hash == "") {
                let annualReports = state.annualReports

                delete annualReports[action.payload.year]

                state.annualReports = annualReports
            }
            else {
                state.annualReports[action.payload.year] = action.payload.hash
            }            
        },
        setStatementElement: (state, action: PayloadAction<{year: number, statement: StatementType, element: number, value: string}>) => {
            // state.financialStatements[action.payload.year]["fds" as keyof IFinancialStatement][action.payload.element] = action.payload.value
            state.financialStatements[action.payload.year][action.payload.statement as keyof IFinancialStatement][action.payload.element] = action.payload.value
        },
        deleteYear: (state, action: PayloadAction<number>) => {
            let financialStatements = state.financialStatements
            let annualReports = state.annualReports

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
    addNewYear,
    setAnnualReportHash,
    setStatementElement,
    deleteYear
} = newCompanyDataSlice.actions

export {
    initialState
}

export default newCompanyDataSlice.reducer
