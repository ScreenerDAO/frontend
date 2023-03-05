import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import IStatement from 'src/types/IStatement'

interface IEditableCashFlowProps {
    year: number
    activeStep: number
    steps: string[]
    handleNext: () => void
    handleBack: () => void
}

const EditableCashFlow = (props: IEditableCashFlowProps): React.ReactElement => {

    // const dispatch = useAppDispatch()
    // const valuesAsMillions = useAppSelector(state => state.general.valuesAsMillions)
    
    const { handleSubmit } = useForm<IStatement>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IStatement> = () => props.handleNext()


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