import * as React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditableBalanceSheet from './EditableBalanceSheet';
import EditableIncomeStatement from './EditableIncomeStatement';
import EditableCashFlow from './EditableCashFlowStatement';

const steps = ['Balance sheet', 'Income statement', 'Cash flow statement'];

interface IEditFinancialStatementsProps {
    year: number
    closeModal: () => void
}

const EditFinancialStatements = (props: IEditFinancialStatementsProps): React.ReactElement => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        props.closeModal()
    };

    const StepContent = (_props: { activeStep: number }): React.ReactElement => {
        switch (_props.activeStep) {
            case 0:
                return <EditableBalanceSheet 
                            year={props.year} 
                            activeStep={activeStep} 
                            steps={steps} 
                            handleBack={handleBack} 
                            handleNext={handleNext} 
                        />
            case 1:
                return <EditableIncomeStatement
                            year={props.year} 
                            activeStep={activeStep} 
                            steps={steps} 
                            handleBack={handleBack} 
                            handleNext={handleNext} 
                        />
            case 2:
                return <EditableCashFlow
                            year={props.year}
                            activeStep={activeStep}
                            steps={steps}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
            default:
                return <></>
        }
    }

    return (
        <Box>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ?
                (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            <p>Upload the annual report to complete the process:</p>
                            <input type="file" />
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleSubmit}>Done</Button>
                        </Box>
                    </React.Fragment>
                )
                :
                (
                    <React.Fragment>
                        <StepContent activeStep={activeStep} />
                    </React.Fragment>
                )}
        </Box>
    )
}

export default EditFinancialStatements