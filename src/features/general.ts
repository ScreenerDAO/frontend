import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneral {
    newCompany: boolean
}

const initialState: IGeneral = {
    newCompany: false
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setNewCompany: (state, action: PayloadAction<boolean>) => {
            state.newCompany = action.payload
        }
    }
})

export const {
    setNewCompany
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer