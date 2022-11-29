

import { configureStore } from "@reduxjs/toolkit"
import companyDataReducer from "src/features/companyDataSlice"
import newCompanyDataReducer from "src/features/newCompanyDataSlice"
import generalReducer from "src/features/general"

const store = configureStore({
    reducer: {
        companyData: companyDataReducer,
        newCompanyData: newCompanyDataReducer,
        general: generalReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

