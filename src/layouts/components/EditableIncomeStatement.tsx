import * as React from 'react'
import { Box, Button, Divider, TextField } from '@mui/material'
import { IIncomeStatement, IncomeStatementOrderedElements } from '../../types/IncomeStatementTypes'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import EditInputElement, { StatementType } from './EditInputElement'
import AccordionWrapper from './AccordionWrapper'
import { AutofillOperation } from 'src/types/FinancialStatementsTypes'
import MillionsSwitch from './MillionsSwitch'
import { changeValuesAsMillions } from 'src/features/general'

interface IEditableIncomeStatementProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableIncomeStatement = (props: IEditableIncomeStatementProps): React.ReactElement => {
    const valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)

    const { control, handleSubmit } = useForm<IIncomeStatement>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IIncomeStatement> = data => {
        props.handleNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ paddingLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
                <MillionsSwitch />
            </div>

            <div>
                <EditInputElement
                    label={1}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                />

                <EditInputElement
                    label={2}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement
                    label={3}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 1, operation: AutofillOperation.Add },
                        { label: 2, operation: AutofillOperation.Subtract }
                    ]}
                />

                <div style={{ marginTop: '10px' }}>
                    <AccordionWrapper
                        elements={{
                            title: 4,
                            elements: [
                                { label: 5, operation: AutofillOperation.Add },
                                { label: 6, operation: AutofillOperation.Add },
                                { label: 7, operation: AutofillOperation.Add }
                            ],
                            total: { label: 8, operation: AutofillOperation.Add }
                        }}
                        statementType={StatementType.IncomeStatement}
                        year={props.year}
                        valuesAsThousands={valuesAsMillions}
                    />
                </div>

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement
                    label={9}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 3, operation: AutofillOperation.Add },
                        { label: 8, operation: AutofillOperation.Subtract }
                    ]}
                />

                <div style={{ marginTop: '10px' }}>
                    <AccordionWrapper
                        elements={{
                            title: 10,
                            elements: [
                                { label: 11, operation: AutofillOperation.Add },
                                { label: 12, operation: AutofillOperation.Subtract },
                                { label: 13, operation: AutofillOperation.Add },
                                { label: 14, operation: AutofillOperation.Add },
                                { label: 15, operation: AutofillOperation.Add }
                            ],
                            total: { label: 16, operation: AutofillOperation.Add }
                        }}
                        statementType={StatementType.IncomeStatement}
                        year={props.year}
                        valuesAsThousands={valuesAsMillions}
                    />
                </div>

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement
                    label={17}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 9, operation: AutofillOperation.Add },
                        { label: 16, operation: AutofillOperation.Add }
                    ]}
                />

                <EditInputElement
                    label={18}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement
                    label={19}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 17, operation: AutofillOperation.Add },
                        { label: 18, operation: AutofillOperation.Subtract }
                    ]}
                />

                <EditInputElement
                    label={20}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                />

                <Divider sx={{ marginTop: "20px" }} />

                <EditInputElement
                    label={21}
                    statementType={StatementType.IncomeStatement}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 19, operation: AutofillOperation.Add },
                        { label: 20, operation: AutofillOperation.Subtract }
                    ]}
                />
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