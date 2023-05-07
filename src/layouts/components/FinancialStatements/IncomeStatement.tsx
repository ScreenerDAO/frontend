import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ICompanyData from '@/lib/types/ICompanyData';
import { StatementType } from '@/lib/types/IStatement';
import { incomeStatementTypesNames } from '@/lib/types/FinancialStatementsTypes';
import { useAppSelector } from '@/hooks';
import { IChartLabel } from './FinancialStatements';
import IStatementDisplayProps from '@/lib/types/IStatementDisplayProps';
import CellValue from './CellValue';

const IncomeStatement = (props: IStatementDisplayProps): React.ReactElement => {
    const StatementTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, borderCollapse: 'separate' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableHeaders />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Rows />
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const TableHeaders = () => {
        return (
            <>
                <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }} />

                {
                    props.yearsSelected.map((dataElement, index) => {
                        return (
                            <TableCell key={index} align="right">{dataElement}</TableCell>
                        )
                    })
                }
            </>
        )
    }

    const Rows = () => {
        return (
            <>
                <Row label={1} />
                <Row label={2} />
                <Row label={3} bold={true} />
                <Row label={5} />
                <Row label={6} />
                <Row label={22} />
                <Row label={7} />
                <Row label={23} />
                <Row label={8} bold={true} />
                <Row label={9} />
                <Row label={11} />
                <Row label={12} />
                <Row label={13} />
                <Row label={14} />
                <Row label={15} />
                <Row label={16} />
                <Row label={17} bold={true} />
                <Row label={18} />
                <Row label={19} bold={true} />
                <Row label={20} />
                <Row label={21} bold={true} />
                <Row label={24} />
                <Row label={25} />
                <Row label={26} />
                <Row label={27} />
            </>
        )
    }

    const Row = ({ label, bold }: { label: number, bold?: boolean }): React.ReactElement => {
        
        // if (props.excludedLabels.includes(label)) {
        //     return <></>
        // }

        const selected = props.selectedLabels.filter(label => label.statement === StatementType.IncomeStatement).map(label => label.label).includes(label)

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
                        statement: StatementType.IncomeStatement,
                        label,
                        type: 'bar'
                    })

                    props.setSelectedLabels(selectedLabels)
                }}
            >
                <TableCell component="th" sx={{ fontWeight: bold ? 900 : 'initial', position: 'sticky', left: 0, backgroundColor: 'white' }}>
                    {incomeStatementTypesNames[label]}
                </TableCell>

                {
                    props.yearsSelected.map((year, index) => {
                        return (
                            <TableCell align="right" key={index} sx={{ fontWeight: bold ? 900 : 'initial' }}>
                                <CellValue value={props.data.financialStatements[year].incomeStatement[label]?.value} />
                            </TableCell>
                        )
                    })
                }
            </ TableRow>
        )
    }

    return <StatementTable />
}

export default IncomeStatement