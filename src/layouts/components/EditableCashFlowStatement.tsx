import * as React from 'react'
import { ICompanyData } from 'src/types/CompanyDataTypes'
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
    const dispatch = useAppDispatch()
    const valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)
    
    const { control, handleSubmit } = useForm<ICashFlow>()

    const onSubmit: SubmitHandler<ICashFlow> = data => {
        props.handleNext()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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