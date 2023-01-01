import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { IBalanceSheet, BalanceSheetOrderedElements } from "../../types/BalanceSheetTypes"
import { useAppSelector, useAppDispatch } from '../../hooks'
import { setBalanceSheet } from 'src/features/newCompanyDataSlice'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { balanceSheetTypesNames, balanceSheetStructure } from 'src/types/FinancialStatementsTypes'
import EditInputElement, { StatementType } from './EditInputElement'
import AccordionWrapper from './AccordionWrapper'

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

    const balanceSheet = useAppSelector((state: { newCompanyData: any }) => state.newCompanyData.financialStatements[props.year].balanceSheet)

    const onSubmit: SubmitHandler<IBalanceSheet> = data => {
        for (const key in data) {
            data[key as keyof IBalanceSheet] = Number(data[key as keyof IBalanceSheet])
        }

        dispatch(setBalanceSheet({ year: props.year, balanceSheet: data }))

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRows />
                    </TableBody>
                </Table>
            </TableContainer> */}

            <div style={{ marginTop: '40px' }}>
                {balanceSheetStructure.map((element, index) => (
                    <AccordionWrapper 
                        key={index}  
                        row={element}
                        statementType={StatementType.BalanceSheet}
                    />
                ))}
            </div>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 6 }}>
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
