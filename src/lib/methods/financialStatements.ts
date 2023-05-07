import IFinancialStatement from "@/lib/types/IFinancialStatement"

const getYearsArray = (financials: { [key: number]: IFinancialStatement }) => {
    if (financials) {
        return Object.keys(financials).map(key => Number(key)).sort()
    }

    return []
}

export {
    getYearsArray
}