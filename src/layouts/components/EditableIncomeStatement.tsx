import * as React from 'react'
import { Box, Button, Divider, TextField } from '@mui/material'
import { IIncomeStatement, IncomeStatementOrderedElements } from '../../types/IncomeStatementTypes'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { setIncomeStatement } from 'src/features/newCompanyDataSlice'
import EditInputElement, { StatementType } from './EditInputElement'
import AccordionWrapper from './AccordionWrapper'

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

        dispatch(setIncomeStatement({ year: props.year, incomeStatement: data }))

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
                <EditInputElement autoComplete={false} label={1} statementType={StatementType.IncomeStatement} />

                <EditInputElement autoComplete={false} label={2} statementType={StatementType.IncomeStatement} />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement autoComplete={true} label={3} statementType={StatementType.IncomeStatement} />

                <div style={{marginTop: '10px'}}>
                    <AccordionWrapper
                        row={{ title: 4, elements: [5, 6, 7], total: 8 }}
                        statementType={StatementType.IncomeStatement}
                    />
                </div>

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement autoComplete={true} label={9} statementType={StatementType.IncomeStatement} />

                <div style={{marginTop: '10px'}}>
                    <AccordionWrapper
                        row={{ title: 10, elements: [11, 12, 13], total: 14 }}
                        statementType={StatementType.IncomeStatement}
                    />
                </div>

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement autoComplete={false} label={15} statementType={StatementType.IncomeStatement} />

                <EditInputElement autoComplete={false} label={16} statementType={StatementType.IncomeStatement} />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement autoComplete={true} label={17} statementType={StatementType.IncomeStatement} />

                <EditInputElement autoComplete={false} label={18} statementType={StatementType.IncomeStatement} />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement autoComplete={true} label={19} statementType={StatementType.IncomeStatement} />
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

export default EditableIncomeStatement