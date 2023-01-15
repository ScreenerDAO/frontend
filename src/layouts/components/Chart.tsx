import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { balanceSheetTypesNames, incomeStatementTypesNames } from 'src/types/FinancialStatementsTypes';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import { ICompanyData, IFinancialStatement, StatementType } from 'src/types/CompanyDataTypes';
import { useAppSelector } from 'src/hooks';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const getSelectedYearsArray = (yearsArray: number[], minAndMax: number[]) => {
    let newArray = []

    for (const year of yearsArray) {
        if (year >= minAndMax[0] && year <= minAndMax[1]) {
            newArray.push(year)
        }
    }

    return newArray
}

const getLabel = (label: {
    statement: StatementType,
    label: number
}) => {
    if (label.statement === StatementType.BalanceSheet) {
        return balanceSheetTypesNames[label.label]
    }
    if (label.statement === StatementType.IncomeStatement) {
        return incomeStatementTypesNames[label.label]
    }
}

const getValue = (
    year: number, 
    store: any,
    label: {
        statement: StatementType,
        label: number
    }
) => {
    if (label.statement === StatementType.BalanceSheet) {
        return store.getState().companyData.financialStatements[year].balanceSheet[label.label]
    }
    if (label.statement === StatementType.IncomeStatement) {
        return store.getState().companyData.financialStatements[year].incomeStatement[label.label]
    }
}

interface IProps {
    years: number[];
    yearsSelected: number[];
    selectedLabels: {
        statement: StatementType,
        label: number
    }[]
}

const Chart = (props: IProps) => {
    const store = useStore<RootState>()
    const years = getSelectedYearsArray(props.years, props.yearsSelected)
    const checked = useAppSelector(state => state.general.logarithmicScale)

    const data = {
        labels: years,
        datasets:
            props.selectedLabels.map((label, index) => {
                return {
                    label: getLabel(label),
                    data: years.map(year => getValue(year, store, label)),
                    backgroundColor: () => {
                        if (index % 2 === 0) {
                            return 'rgb(124, 181, 236)'
                        }
                        return 'rgb(67, 67, 72)'
                    }
                }
            }),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: false,
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    callback: (value: any) => {
                        if (value >= 1000000000) {
                            return `${value / 1000000000}B`
                        }
                        if (value >= 1000000) {
                            return `${value / 1000000}M`
                        }
                        if (value >= 1000) {
                            return `${value / 1000}K`
                        }
                        return value
                    }
                },
                type: checked ? 'logarithmic' as const : 'linear' as const,
            }
        }
    };

    return <Bar options={options} data={data} />;
}

export default Chart