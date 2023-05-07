import { IChartLabel } from "@/layouts/components/FinancialStatements/FinancialStatements"
import ICompanyData from "./ICompanyData"

export default interface IStatementDisplayProps {
    data: ICompanyData
    yearsSelected: number[]
    selectedLabels: IChartLabel[],
    setSelectedLabels: (labels: IChartLabel[]) => void
    
    // excludedLabels: number[]
}