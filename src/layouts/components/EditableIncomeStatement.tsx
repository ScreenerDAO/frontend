import * as React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { IIncomeStatement, IncomeStatementOrderedElements } from '../../types/IncomeStatementTypes'
import FinancialStatementField from './FinancialStatementField'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IBalanceSheet } from 'src/types/BalanceSheetTypes'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { setIncomeStatement } from 'src/features/newCompanyDataSlice'

interface IEditableIncomeStatementProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableIncomeStatement = (props: IEditableIncomeStatementProps): React.ReactElement => {
    const { control, handleSubmit } = useForm<IIncomeStatement>({
        mode: 'onChange'
    });
    const dispatch = useAppDispatch()

    const incomeStatement = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[props.year].incomeStatement)
    
    const onSubmit: SubmitHandler<IIncomeStatement> = data => {
        for (const key in data) {
            data[key as keyof IIncomeStatement] = Number(data[key as keyof IIncomeStatement])
        }

        dispatch(setIncomeStatement({year: props.year, incomeStatement: data}))
    
        props.handleNext()
    }

    const InputField = (_props: { rowIndex: number }) => {
        return (
            <Controller
                name={IncomeStatementOrderedElements[_props.rowIndex].key as keyof IIncomeStatement}
                defaultValue={incomeStatement != null ? incomeStatement[IncomeStatementOrderedElements[_props.rowIndex].key as keyof IIncomeStatement] : undefined}
                control={control}
                render={({ field }) => (
                    <TextField  
                        variant="standard"
                        type="number"
                        autoComplete="off"
                        sx={{ input: { textAlign: "center" } }}
                        {...field}
                    />
                )}
            />
        )
    }

    const TableRows = (): React.ReactElement => {
        let rows: Array<React.ReactElement> = []

        for (let rowIndex = 0; rowIndex < IncomeStatementOrderedElements.length; rowIndex++) {
            rows.push(
                <TableRow key={rowIndex}>
                    <TableCell component="th">
                        <FinancialStatementField fieldData={IncomeStatementOrderedElements[rowIndex]} h1Fields={[]} h3Fields={['GrossProfit', 'OperatingIncome', 'EarningsBeforeTaxes', 'NetIncome']} />
                    </TableCell>
                    <TableCell align="right">
                        <InputField rowIndex={rowIndex} />
                    </TableCell>
                </TableRow>
            )
        }

        return <>{rows}</>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer component={Paper} style={{ maxHeight: '400px', marginTop: '40px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRows />
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={props.activeStep === 0}
                    onClick={props.handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* <Button onClick={props.handleNext} type='submit'>
                    {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                </Button> */}
                <Button type='submit'>
                    {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </form>
    )
}

export default EditableIncomeStatement