import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IGeneral {
    companyLoading: boolean
    valuesAsMillions: boolean
    logarithmicScale: boolean
}

const initialState: IGeneral = {
    companyLoading: false,
    valuesAsMillions: false,
    logarithmicScale: false
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
        }
    }
})

export const {
    setCompanyLoading: setCompanyLoading,
    changeValuesAsMillions: changeValuesAsMillions,
    changeLogarithmicScale: changeLogarithmicScale
} = generalSlice.actions

export type {
    IGeneral
}

export default generalSlice.reducer