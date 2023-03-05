import IStatementElement from "./IStatementElement"

export default interface IStatement {
    [key: number]: IStatementElement
}

export enum StatementType {
    BalanceSheet="balanceSheet",
    IncomeStatement="incomeStatement",
    CashFlowStatement="cashFlow"
}