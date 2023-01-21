import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IBalanceSheet, BalanceSheetOrderedElements } from "../../types/BalanceSheetTypes"
import { ICompanyData, StatementType } from '../../types/CompanyDataTypes';
import FinancialStatementField from './FinancialStatementField';
import { IElement, IElementsGroup, balanceSheetStructure, balanceSheetTypesNames } from 'src/types/FinancialStatementsTypes';
import { useAppSelector } from 'src/hooks';
import { IChartLabel } from './FinancialStatements';

interface IBalanceSheetProps {
    data: ICompanyData
    yearsSelected: number[]
    selectedLabels: IChartLabel[],
    setSelectedLabels: (labels: IChartLabel[]) => void
}

const BalanceSheet = (props: IBalanceSheetProps): React.ReactElement => {
    // const labelsWithData = []

    // for (const label of Object.keys(balanceSheetStructure)) {
    //     for (const year of props.yearsSelected) {
    //         if (props.data.financialStatements[year].balanceSheet[label] && props.data.balanceSheet[year][label] !== 0) {
    //             labelsWithData.push(label)

    //             break
    //         }
    //     }
    // }

    const TableHeaders = () => {
        return (
            <>
                <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }}></TableCell>

                {
                    props.yearsSelected.map(dataElement => {
                        return (
                            <TableCell align="right" key={dataElement}>{dataElement}</TableCell>
                        )
                    })
                }
            </>
        )
    }

    const ElementGroupRows = ({ element }: { element: IElementsGroup }): React.ReactElement => {
        return (
            <>
                {
                    element.elements.map((cElement, index) => {
                        if (cElement && (cElement as IElementsGroup).total) {
                            return (
                                <ElementGroupRows element={cElement as IElementsGroup} key={index} />
                            )
                        }

                        return (
                            <Row label={(cElement as IElement).label} key={index} />
                        )
                    })
                }


                <Row label={element.total.label} bold={true} />
            </>
        )
    }

    const Row = ({ label, bold }: { label: number, bold?: boolean }): React.ReactElement => {
        const selected = props.selectedLabels.filter(label => label.statement === StatementType.BalanceSheet).map(label => (label.label)).includes(label)

        return (
            <TableRow
                hover
                selected={selected}
                onClick={() => {
                    let selectedLabels = props.selectedLabels

                    if (selected) {
                        props.setSelectedLabels(props.selectedLabels.filter(cLabel => cLabel.label !== label))

                        return
                    }

                    selectedLabels.push({
                        statement: StatementType.BalanceSheet,
                        label,
                        type: 'bar'
                    })

                    props.setSelectedLabels(selectedLabels)
                }}
            >
                <TableCell component="th" sx={{ fontWeight: bold ? 900 : 'initial', position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {balanceSheetTypesNames[label]}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index} sx={{ fontWeight: bold ? 900 : 'initial' }}>
                                <CellValue value={props.data.financialStatements[year].balanceSheet[label]} />
                            </TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    const CellValue = ({ value }: { value: string }) => {
        let valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)
        let number = Number(value)

        if (isNaN(number) || number === 0) {
            return <>-</>
        }

        if (valuesAsMillions) {
            return <>{parseFloat((number / 1000000).toFixed(2)).toLocaleString()}</>
        }

        return <>{number.toLocaleString()}</>
    }

    const TableRows = (): React.ReactElement => (<>{
        balanceSheetStructure.map((row, rowIndex) => {
            return (
                <ElementGroupRows element={row} key={rowIndex} />
            )
        })
    }</>)


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableHeaders />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRows />
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BalanceSheet