import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IIncomeStatement, IncomeStatementOrderedElements } from "../../types/IncomeStatementTypes"
import { ICompanyData, StatementType } from '../../types/CompanyDataTypes';
import { TextField } from '@mui/material';
import FinancialStatementField from './FinancialStatementField';
import { incomeStatementTypesNames } from 'src/types/FinancialStatementsTypes';
import { useAppSelector } from 'src/hooks';
import { IChartLabel } from './FinancialStatements';

interface IIncomeStatementProps {
    data: ICompanyData
    yearsArray: number[]
    selectedLabels: IChartLabel[],
    setSelectedLabels: (labels: IChartLabel[]) => void
    excludedLabels: number[]
}

const IncomeStatement = (props: IIncomeStatementProps): React.ReactElement => {
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
                <TableCell sx={{ minWidth: '250px', position: 'sticky', left: 0, backgroundColor: 'white' }}></TableCell>

                {
                    props.yearsArray.map((dataElement, index) => {
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
            </>
        )
    }

    const Row = ({ label, bold }: { label: number, bold?: boolean }): React.ReactElement => {
        if (props.excludedLabels.includes(label)) {
            return <></>
        }

        const selected = props.selectedLabels.filter(label => label.statement === StatementType.IncomeStatement).map(label => label.label).includes(label)

        return (
            <TableRow
                hover
                selected={selected}
                onClick={() => {
                    let selectedLabels = [...props.selectedLabels]

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
                    props.yearsArray.map((year, index) => {
                        return (
                            <TableCell align="right" key={index} sx={{ fontWeight: bold ? 900 : 'initial' }}>
                                <CellValue value={props.data.financialStatements[year].incomeStatement[label]} />
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

    return <StatementTable />
}

export default IncomeStatement