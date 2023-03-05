import * as React from 'react'
import { Box, Button } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import { AutofillOperation, balanceSheetStructure } from 'src/types/FinancialStatementsTypes'
import EditInputElement from '../EditInputElement'
import { StatementType } from 'src/types/IStatement'
import AccordionWrapper from '../AccordionWrapper'
import IStatement from 'src/types/IStatement'
import MillionsSwitch from '../MillionsSwitch'
import { useAppSelector } from 'src/hooks'

interface IEditableBalanceSheetProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableBalanceSheet = (props: IEditableBalanceSheetProps): React.ReactElement => {
    const valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)

    const { handleSubmit } = useForm<IStatement>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IStatement> = () => props.handleNext()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ paddingLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>
                <MillionsSwitch />
            </div>

            <div>
                {balanceSheetStructure.map((element, index) => (
                    <AccordionWrapper
                        key={index}
                        elements={element}
                        statementType={StatementType.BalanceSheet}
                        year={props.year}
                        valuesAsThousands={valuesAsMillions}
                    />
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <EditInputElement
                    label={52}
                    statementType={StatementType.BalanceSheet}
                    year={props.year}
                    valuesAsThousands={valuesAsMillions}
                    autofillElements={[
                        { label: 43, operation: AutofillOperation.Add },
                        { label: 51, operation: AutofillOperation.Add }
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

export default EditableBalanceSheet
