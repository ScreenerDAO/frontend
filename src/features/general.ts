import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ICompanyEthData from '@/lib/types/ICompanyEthData'

interface IGeneral {
    companyLoading: boolean
    valuesAsMillions: boolean
    logarithmicScale: boolean
    companies: ICompanyEthData[] | null
}

const initialState: IGeneral = {
    companyLoading: false,
    valuesAsMillions: true,
    logarithmicScale: false,
    companies: null,
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCompanyLoading: (state, action: PayloadAction<boolean>) => {
            state.companyLoading = action.payload
        },
        changeValuesAsMillions: (state) => {
            state.valuesAsMillions = !state.valuesAsMillions
        },
        changeLogarithmicScale: (state) => {
            state.logarithmicScale = !state.logarithmicScale
        },
        setCompanies: (state, action: PayloadAction<ICompanyEthData[]>) => {
            state.companies = action.payload
        },
    }
})

export const {
    setCompanyLoading: setCompanyLoading,
    changeValuesAsMillions: changeValuesAsMillions,
    changeLogarithmicScale: changeLogarithmicScale,
    setCompanies: setCompanies,
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer