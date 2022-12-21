import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IIncomeStatement, IncomeStatementOrderedElements } from "../../types/IncomeStatementTypes"
import { ICompanyData } from '../../types/CompanyDataTypes';
import { TextField } from '@mui/material';
import FinancialStatementField from './FinancialStatementField';

interface IIncomeStatementProps {
    data: ICompanyData
    yearsArray: number[]
}

const IncomeStatement = (props: IIncomeStatementProps): React.ReactElement => {
    const StatementTable = () => {
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

    const TableHeaders = () => {
        return (
            <>
                <TableCell></TableCell>

                {
                    props.yearsArray.map(dataElement => {
                        return (
                            <TableCell key={dataElement} align="right">{dataElement}</TableCell>
                        )
                    })
                }
            </>
        )
    }

    const TableRows = (): React.ReactElement => {
        let rows: Array<React.ReactElement> = []

        for (let rowIndex = 0; rowIndex < IncomeStatementOrderedElements.length; rowIndex++) {
            let row: Array<React.ReactElement> = []

            for (let colIndex = 0; colIndex < props.yearsArray.length; colIndex++) {
                if (colIndex == 0) {
                    row.push(
                        <TableCell key={colIndex} component="th">
                            <FinancialStatementField fieldData={IncomeStatementOrderedElements[rowIndex]} h1Fields={[]} h3Fields={['GrossProfit', 'OperatingIncome', 'EarningsBeforeTaxes', 'NetIncome']} />
                        </TableCell>
                    )
                }

                row.push(
                    <TableCell key={colIndex + 1} align="right">
                        {props.data.financialStatements[props.yearsArray[colIndex]].incomeStatement ?
                            props.data.financialStatements[props.yearsArray[colIndex]].incomeStatement![IncomeStatementOrderedElements[rowIndex].key as keyof IIncomeStatement]
                            :
                            '-'
                        }
                    </TableCell>
                )
            }

            rows.push(<TableRow key={rowIndex}>{row}</TableRow>)
        }

        return <>{rows}</>
    }

    return <StatementTable />
}

export default IncomeStatement