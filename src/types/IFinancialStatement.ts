import IStatement from "./IStatement"

export default interface IFinancialStatement {
    balanceSheet: IStatement
    incomeStatement: IStatement
    cashFlow: IStatement
}