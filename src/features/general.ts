import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneral {
    isNewCompany: boolean
    selectedId: number
    companyLoading: boolean
}

const initialState: IGeneral = {
    isNewCompany: false,
    selectedId: 0,
    companyLoading: false
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsNewCompany: (state, action: PayloadAction<boolean>) => {
            state.isNewCompany = action.payload
        },
        setId: (state, action: PayloadAction<number>) => {
            state.selectedId = action.payload
        },
        setCompanyLoading: (state, action: PayloadAction<boolean>) => {
            state.companyLoading = action.payload
        }
    }
})

export const {
    setIsNewCompany: setIsNewCompany,
    setCompanyLoading: setCompanyLoading
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer