import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneral {
    isNewCompany: boolean
    selectedId: number
}

const initialState: IGeneral = {
    isNewCompany: false,
    selectedId: 0
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
        }
    }
})

export const {
    setIsNewCompany: setIsNewCompany
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer