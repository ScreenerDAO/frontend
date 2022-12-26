import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBalanceSheet } from 'src/types/BalanceSheetTypes'
import { ICashFlow } from 'src/types/CashFlowTypes'
import { ICompanyData, IFinancialStatement } from 'src/types/CompanyDataTypes'
import { IIncomeStatement } from 'src/types/IncomeStatementTypes'

// Define the initial state using that type
const initialState: ICompanyData = {
    id: null,
    companyName: "",
    ticker: "",
    country: "",
    financialStatements: {
    }
}

const bsInicialState: IBalanceSheet = {
    TotalAssets: 0,
    TotalCurrentAssets: 0,
    CashAndEquivalents: 0,
    Inventory: 0,
    OtherCurrentAssets: 0,
    TotalNonCurrentAssets: 0,
    PropertyPlantAndEquipment: 0,
    AccumulatedDepreciation: 0,
    LongTermInvestments: 0,
    Goodwill: 0,
    OtherNonCurrentAssets: 0,
    TotalLiabilities: 0,
    TotalCurrentLiabilities: 0,
    AccountsPayable: 0,
    ShortTermDebt: 0,
    OtherCurrentLiabilities: 0,
    TotalNonCurrentLiabilities: 0,
    LongTermDebt: 0,
    CapitalLeases: 0,
    OtherNonCurrentLiabilities: 0,
    TotalEquity: 0,
    CommonStock: 0,
    AdditionalPaidInCapital: 0,
    RetainedEarnings: 0,
    MinorityInterest: 0
}

const isInitialState: IIncomeStatement = {
    Revenue: 0,
    CostGoodsSold: 0,
    GrossProfit: 0,
    SellingGeneralAndAdministrativeExpenses: 0,
    DepreciationAndAmortization: 0,
    OtherOperatingExpenses: 0,
    OperatingIncome: 0,
    InterestExpense: 0,
    InterestIncome: 0,
    OtherNonOperatingIncomeExpenses: 0,
    EarningsBeforeTaxes: 0,
    IncomeTaxExpense: 0,
    NetIncome: 0
}

const cfInitialState: ICashFlow = {
    NetIncome: 0,
    OtherOperatingActivities: 0,
    CashFromOperations: 0,
    OtherInvestingActivities: 0,
    CashFromInvesting: 0,
    CommonDividendsPaid: 0,
    RepurchaseOfCommonStock: 0,
    IssuanceOfCommonStock: 0,
    OtherFinancingActivities: 0,
    CashFromFinancing: 0,
    NetChangeCash: 0
}

export const newCompanyDataSlice = createSlice({
    name: 'newCompanyData',
    initialState,
    reducers: {
        setCompanyData: (state, action: PayloadAction<ICompanyData>) => {
            state.id = action.payload.id
            state.companyName = action.payload.companyName
            state.ticker = action.payload.ticker
            state.country = action.payload.country
            state.financialStatements = action.payload.financialStatements
        },
        setCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload
        },
        setCompanyTicker: (state, action: PayloadAction<string>) => {
            state.ticker = action.payload
        },
        setCompanyCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload
        },
        setFinancialStatemets: (state, action: PayloadAction<{
            [key: number]: IFinancialStatement;
        }>) => {
            state.financialStatements = action.payload
        },
        addNewYear: (state, action: PayloadAction<number>) => {
            state.financialStatements[action.payload] = {
                annualReportHash: null,
                balanceSheet: null,
                incomeStatement: null,
                cashFlow: null
            }
        },
        setAnnualReportHash: (state, action: PayloadAction<{year: number, hash: string}>) => {
            state.financialStatements[action.payload.year].annualReportHash = action.payload.hash
        },
        setBalanceSheet: (state, action: PayloadAction<{year: number, balanceSheet: IBalanceSheet}>) => {
            state.financialStatements[action.payload.year].balanceSheet = action.payload.balanceSheet
        },
        setIncomeStatement: (state, action: PayloadAction<{year: number, incomeStatement: IIncomeStatement}>) => {
            state.financialStatements[action.payload.year].incomeStatement = action.payload.incomeStatement 
        },
        setCashFlow: (state, action: PayloadAction<{year: number, cashFlow: ICashFlow}>) => {
            state.financialStatements[action.payload.year].cashFlow = action.payload.cashFlow
        }
    },
})

export const { 
    setCompanyData, 
    setCompanyName, 
    setCompanyCountry, 
    setCompanyTicker,
    setFinancialStatemets,
    addNewYear,
    setAnnualReportHash,
    setBalanceSheet,
    setIncomeStatement,
    setCashFlow
} = newCompanyDataSlice.actions

export {
    initialState
}

export default newCompanyDataSlice.reducer
