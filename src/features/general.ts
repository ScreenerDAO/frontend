import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneral {
    companyLoading: boolean
}

const initialState: IGeneral = {
    companyLoading: false
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCompanyLoading: (state, action: PayloadAction<boolean>) => {
            state.companyLoading = action.payload
        }
    }
})

export const {
    setCompanyLoading: setCompanyLoading
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer