import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StatementType } from '@/lib/types/IStatement';
import { IElement, IElementsGroup, balanceSheetStructure, balanceSheetTypesNames } from '@/lib/types/FinancialStatementsTypes';
import IStatementDisplayProps from '@/lib/types/IStatementDisplayProps';
import CellValue from './CellValue';

const BalanceSheet = (props: IStatementDisplayProps): React.ReactElement => {
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

    const TableRows = (): React.ReactElement => (
        <>
            {
                balanceSheetStructure.map((row, rowIndex) => {
                    return (
                        <ElementGroupRows element={row} key={rowIndex} />
                    )
                })
            }
        </>
    )

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

                        // if (props.excludedLabels.includes((cElement as IElement).label)) return

                        return (
                            <Row label={(cElement as IElement).label} key={index} />
                        )
                    })
                }

                {/* {(props.excludedLabels.includes(element.total.label)) ? null : <Row label={element.total.label} bold={true} final={element.total.final} />} */}
                <Row label={element.total.label} bold={true} final={element.total.final} />
            </>
        )
    }

    const Row = ({ label, bold }: { label: number, bold?: boolean, final?: boolean }): React.ReactElement => {
        const selected = props.selectedLabels.filter(label => label.statement === StatementType.BalanceSheet).map(label => (label.label)).includes(label)

        return (
            <TableRow
                hover
                selected={selected}

                // sx={{ borderTop: final ? '2px solid grey' : '1px solid black'}}
                onClick={() => {
                    const selectedLabels = [...props.selectedLabels]

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
                                <CellValue value={props.data.financialStatements[year].balanceSheet[label]?.value} />
                            </TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, }}>
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