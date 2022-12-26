import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBalanceSheet } from 'src/types/BalanceSheetTypes'
import { ICashFlow } from 'src/types/CashFlowTypes'
import { ICompanyData, IFinancialStatement } from 'src/types/CompanyDataTypes'
import { IIncomeStatement } from 'src/types/IncomeStatementTypes'

// Define the initial state using that type
const initialState: ICompanyData = {
    id: null,
    companyName: "",
    ticker: "",
    country: "",
    financialStatements: {
    }
}

export const companyDataSlice = createSlice({
    name: 'companyData',
    initialState,
    reducers: {
        setCompanyData: (state, action: PayloadAction<ICompanyData>) => {
            state.id = action.payload.id
            state.companyName = action.payload.companyName
            state.ticker = action.payload.ticker
            state.country = action.payload.country
            state.financialStatements = action.payload.financialStatements
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
        setFinancialStatemets: (state, action: PayloadAction<{
            [key: number]: IFinancialStatement;
        }>) => {
            state.financialStatements = action.payload
        }
    },
})

export const { 
    setCompanyData, 
    setCompanyName, 
    setCompanyCountry, 
    setCompanyTicker,
    setFinancialStatemets
} = companyDataSlice.actions

export {
    initialState
}

export default companyDataSlice.reducer