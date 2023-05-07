

import { configureStore } from "@reduxjs/toolkit"
import companyDataReducer from "@/features/companyDataSlice"
import newCompanyDataReducer from "@/features/newCompanyDataSlice"
import generalReducer from "@/features/general"

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

