import * as React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { IBalanceSheet, BalanceSheetOrderedElements } from "../../types/BalanceSheetTypes"
import { useAppSelector, useAppDispatch } from '../../hooks'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { setBalanceSheet } from 'src/features/newCompanyDataSlice'
import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface IEditableBalanceSheetProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableBalanceSheet = (props: IEditableBalanceSheetProps): React.ReactElement => {
    const { control, handleSubmit } = useForm<IBalanceSheet>({
        mode: 'onChange'
    });
    const dispatch = useAppDispatch()

    const balanceSheet = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[props.year].balanceSheet)

    const onSubmit: SubmitHandler<IBalanceSheet> = data => {
        for (const key in data) {
            data[key as keyof IBalanceSheet] = Number(data[key as keyof IBalanceSheet])
        }

        dispatch(setBalanceSheet({year: props.year, balanceSheet: data}))

        props.handleNext()
    }

    const InputField = (_props: { rowIndex: number }) => {
        return (
            <Controller
                name={BalanceSheetOrderedElements[_props.rowIndex].key as keyof IBalanceSheet}
                defaultValue={balanceSheet != null ? balanceSheet[BalanceSheetOrderedElements[_props.rowIndex].key as keyof IBalanceSheet] : undefined}
                control={control}
                render={({ field }) => (
                    <TextField
                        variant="standard"
                        type='number'
                        autoComplete="off"
                        sx={{ input: { textAlign: 'center' } }}
                        {...field}
                    />
                )}
            />
        )
    }

    const TableRows = (): React.ReactElement => {
        let rows: Array<React.ReactElement> = []

        for (let rowIndex = 0; rowIndex < BalanceSheetOrderedElements.length; rowIndex++) {
            rows.push(
                <TableRow key={rowIndex}>
                    <TableCell component="th">{BalanceSheetOrderedElements[rowIndex].description}</TableCell>
                    <TableCell align='right'>
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

export default EditableBalanceSheet
