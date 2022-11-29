import * as React from 'react'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { setCashFlow } from 'src/features/newCompanyDataSlice'
import { CashFlowOrderedElements, ICashFlow } from 'src/types/CashFlowTypes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'

interface IEditableCashFlowProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableCashFlow = (props: IEditableCashFlowProps): React.ReactElement => {
    const { control, handleSubmit } = useForm<ICashFlow>()

    const dispatch = useAppDispatch()

    const cashFlow = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[props.year].cashFlow)

    const onSubmit: SubmitHandler<ICashFlow> = data => {
        for (const key in data) {
            data[key as keyof ICashFlow] = Number(data[key as keyof ICashFlow])
        }

        dispatch(setCashFlow({year: props.year, cashFlow: data}))
        
        props.handleNext()
    }

    const InputField = (_props: { rowIndex: number }) => {
        return (
            <Controller
                name={CashFlowOrderedElements[_props.rowIndex].key as keyof ICashFlow}
                defaultValue={cashFlow != null ? cashFlow[CashFlowOrderedElements[_props.rowIndex].key as keyof ICashFlow] : undefined}
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

        for (let rowIndex = 0; rowIndex < CashFlowOrderedElements.length; rowIndex++) {
            rows.push(
                <TableRow key={rowIndex}>
                    <TableCell component='th'>{CashFlowOrderedElements[rowIndex].description}</TableCell>
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
                <Table aria-label='simple table'>
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
                    color='inherit'
                    disabled={props.activeStep === 0}
                    onClick={props.handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                
                <Box sx={{ flex: '1 1 auto'}} />
                
                <Button type='submit'>Next
                    {/* {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'} */}
                </Button>
            </Box>
        </form>
    )
}

export default EditableCashFlow