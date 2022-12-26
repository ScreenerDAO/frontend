import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IBalanceSheet, BalanceSheetOrderedElements } from "../../types/BalanceSheetTypes"
import { ICompanyData } from '../../types/CompanyDataTypes';
import FinancialStatementField from './FinancialStatementField';

interface IBalanceSheetProps {
    data: ICompanyData
    yearsSelected: number[]
}

const BalanceSheet = (props: IBalanceSheetProps): React.ReactElement => {
    const TableHeaders = () => {
        return (
            <>
                <TableCell></TableCell>

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

    const TableRows = (): React.ReactElement => {
        let rows: Array<React.ReactElement> = []

        if (props.yearsSelected.length > 0) {
            for (let rowIndex = 0; rowIndex < BalanceSheetOrderedElements.length; rowIndex++) {
                let row: Array<React.ReactElement> = []
    
                for (let colIndex = 0; colIndex < props.yearsSelected.length; colIndex++) {
                    if (colIndex == 0) {
                        row.push(
                            <TableCell key={colIndex} component="th">
                                <FinancialStatementField fieldData={BalanceSheetOrderedElements[rowIndex]} h1Fields={["TotalAssets", "TotalLiabilities", "TotalEquity"]} h3Fields={["TotalCurrentAssets", "TotalNonCurrentAssets", "TotalCurrentLiabilities", "TotalNonCurrentLiabilities"]} />
                            </TableCell>
                        )
                    }
    
                    const balanceSheet = props.data.financialStatements[props.yearsSelected[colIndex]].balanceSheet

                    row.push(
                        <TableCell key={colIndex + 1} align="right">
                            {balanceSheet && balanceSheet![BalanceSheetOrderedElements[rowIndex].key as keyof IBalanceSheet] ?
                                balanceSheet![BalanceSheetOrderedElements[rowIndex].key as keyof IBalanceSheet]
                                :
                                '-'
                            }
                        </TableCell>
                    )
                }
    
                rows.push(<TableRow key={rowIndex}>{row}</TableRow>)
            }
        }

        return <>{rows}</>
    }

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