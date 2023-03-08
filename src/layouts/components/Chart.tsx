import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    LogarithmicScale,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { balanceSheetTypesNames, cashFlowStatementTypesNames, incomeStatementTypesNames } from 'src/types/FinancialStatementsTypes';
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import { StatementType } from 'src/types/IStatement';
import { useAppSelector } from 'src/hooks';
import { IChartLabel } from './FinancialStatements/FinancialStatements';

ChartJS.register(
    LinearScale,
    LogarithmicScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const getSelectedYearsArray = (yearsArray: number[], minAndMax: number[]) => {
    const newArray = []

    for (const year of yearsArray) {
        if (year >= minAndMax[0] && year <= minAndMax[1]) {
            newArray.push(year)
        }
    }

    return newArray
}

const getLabel = (label: IChartLabel ) => {
    if (label.statement === StatementType.BalanceSheet) {
        return balanceSheetTypesNames[label.label]
    }
    if (label.statement === StatementType.IncomeStatement) {
        return incomeStatementTypesNames[label.label]
    }
    if (label.statement === StatementType.CashFlowStatement) {
        return cashFlowStatementTypesNames[label.label]
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
        return store.getState().companyData.financialStatements[year].balanceSheet[label.label]?.value
    }
    if (label.statement === StatementType.IncomeStatement) {
        const incomeStatement = store.getState().companyData.financialStatements[year].incomeStatement

        if (incomeStatement) {
            return store.getState().companyData.financialStatements[year].incomeStatement[label.label]?.value
        }

        return null
    }
}

interface IProps {
    years: number[];
    yearsSelected: number[];
    selectedLabels: IChartLabel[]
}

const CustomChart = (props: IProps) => {
    const store = useStore<RootState>()
    const years = getSelectedYearsArray(props.years, props.yearsSelected)
    const checked = useAppSelector(state => state.general.logarithmicScale)

    const data = {
        labels: years,
        datasets: props.selectedLabels.map((label, index) => {
            return {
                type: label.type as any,
                label: getLabel(label),
                borderColor: () => {
                    switch (index % 5){
                        case 0:
                            return 'rgb(124, 181, 236)'
                        case 1:
                            return 'rgb(67, 67, 72)'
                        case 2:
                            return 'rgb(144, 237, 125)'
                        case 3:
                            return 'rgb(255, 188, 117)'
                        case 4:
                            return 'rgb(153, 158, 255)'

                    }
                },
                borderWidth: 2,
                data: years.map(year => getValue(year, store, label)),
                backgroundColor: () => {
                    switch (index % 5){
                        case 0:
                            return 'rgb(124, 181, 236)'
                        case 1:
                            return 'rgb(67, 67, 72)'
                        case 2:
                            return 'rgb(144, 237, 125)'
                        case 3:
                            return 'rgb(255, 188, 117)'
                        case 4:
                            return 'rgb(153, 158, 255)'

                    }
                },
                pointRadius: 3,
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

    return <Chart type='bar' data={data} options={options} />;
}

export default CustomChart

export {
    getLabel
}