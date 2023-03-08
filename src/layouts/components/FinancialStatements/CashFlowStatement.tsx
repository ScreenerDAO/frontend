import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IStatementDisplayProps from "src/types/IStatementDisplayProps";
import { StatementType } from 'src/types/IStatement';
import { cashFlowStatementTypesNames } from 'src/types/FinancialStatementsTypes';
import CellValue from './CellValue';

console.log('adsfdsaf')

const CashFlowStatement = (props: IStatementDisplayProps): React.ReactElement => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, borderCollapse: 'separate' }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableHeaders {...props} />
                </TableRow>
            </TableHead>

            <TableBody>
                <Rows {...props} />
            </TableBody>
        </Table>
    </TableContainer>
)

const TableHeaders = (props: IStatementDisplayProps) => (
    <>
        <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }} />

        {props.yearsSelected.map((dataElement, index) => (
            <TableCell key={index} align="right">{dataElement}</TableCell>
        ))}
    </>
)

const Rows = (props: IStatementDisplayProps) => {
   
    const Row = ({ label, bold }: {
        label: number,
        bold?: boolean,
    }): React.ReactElement => {
        const selected = props.selectedLabels.filter(label => label.statement === StatementType.CashFlowStatement).map(label => label.label).includes(label)

        return (
            <TableRow
                hover
                selected={selected}
                onClick={() => {
                    const selectedLabels = [...props.selectedLabels]

                    if (selected) {
                        props.setSelectedLabels(props.selectedLabels.filter(cLabel => cLabel.label !== label))

                        return
                    }

                    selectedLabels.push({
                        statement: StatementType.CashFlowStatement,
                        label,
                        type: 'bar'
                    })

                    props.setSelectedLabels(selectedLabels)
                }}
            >
                <TableCell component="th" sx={{ fontWeight: bold ? 900 : 'initial', position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {cashFlowStatementTypesNames[label]}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index} sx={{ fontWeight: bold ? 900 : 'initial' }}>
                                <CellValue value={props.data.financialStatements[year].cashFlow[label]?.value} />
                            </TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    return (
        <>
            <Row label={2} />
            <Row label={3} />
            <Row label={4} />
            <Row label={5} />
            <Row label={6} />
            <Row label={7} />
            <Row label={8} />
            <Row label={9} />
            <Row label={10} />
            <Row label={11} />
            <Row label={12} bold={true} />
            <Row label={14} />
            <Row label={15} />
            <Row label={16} />
            <Row label={17} />
            <Row label={18} />
            <Row label={19} bold={true} />
            <Row label={21} />
            <Row label={22} />
            <Row label={23} />
            <Row label={24} />
            <Row label={25} />
            <Row label={26} bold={true} />
            <Row label={27} />
            <Row label={28} bold={true} />
            <Row label={29} bold={true} />
            <Row label={30} bold={true} />
        </>
    )
}

export default CashFlowStatement