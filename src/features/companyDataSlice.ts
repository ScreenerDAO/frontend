import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICompanyData, IFinancialStatement } from 'src/types/CompanyDataTypes'

const initialState: ICompanyData = {
    id: null,
    companyName: "",
    ticker: "",
    country: "",
    // currency: null,
    financialStatements: {},
    annualReports: {}
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
            // state.currency = action.payload.currency
            state.financialStatements = action.payload.financialStatements
            state.annualReports = action.payload.annualReports 
        },
    },
})

export const { 
    setCompanyData, 
} = companyDataSlice.actions

export {
    initialState
}

export default companyDataSlice.reducer