import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyData from 'src/types/ICompanyData'

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

export const companyDataSlice = createSlice({
    name: 'companyData',
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