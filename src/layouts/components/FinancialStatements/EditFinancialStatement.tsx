import * as React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import EditableBalanceSheet from './EditableBalanceSheet';
import EditableIncomeStatement from './EditableIncomeStatement';
import EditableCashFlow from './EditableCashFlowStatement';
import { useAppDispatch } from 'src/hooks';
import { setAnnualReportHash } from 'src/features/newCompanyDataSlice';
import { Alert, CircularProgress } from '@mui/material';
import { saveFile } from 'src/lib/generalMethods';

const steps = ['Balance sheet', 'Income statement', 'Cash flow statement'];

interface IEditFinancialStatementsProps {
    year: number
    closeModal: () => void
}

const EditFinancialStatements = (props: IEditFinancialStatementsProps): React.ReactElement => {
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useAppDispatch()

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

    /*TODO: use react query */
    const LastStep = () => {
        const [uploadingFile, setUploadingFile] = React.useState<boolean>(false)
        const [errorUploadingFile, setErrorUploadingFile] = React.useState<boolean>(false)
        const [successUploadingFile, setSuccessUploadingFile] = React.useState<boolean>(false)

        const handleFileUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target?.files && ev.target?.files.length > 0) {
                setUploadingFile(true)

                if (errorUploadingFile) {
                    setErrorUploadingFile(false)
                }
                if (successUploadingFile) {
                    setSuccessUploadingFile(false)
                }

                try {
                    const base64 = await readFileAsBase64(ev.target.files[0])

                    const response = await fetch(`${process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_ENDPOINT}/SaveFile`, {
                        method: 'POST',
                        body: JSON.stringify({file: base64})
                    })

                    if (response.ok) {
                        const hash = await response.text()
                        dispatch(setAnnualReportHash({ year: props.year, hash: hash }))
                        setSuccessUploadingFile(true)
                    }
                    else {
                        setErrorUploadingFile(true)
                    }
                }
                catch {
                    setErrorUploadingFile(true)
                }
                finally {
                    setUploadingFile(false)
                }
            }
        }

        const StepSpinner = () => {
            return (
                <>
                    <p style={{ marginBottom: 0 }}>Uploading file...</p>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <CircularProgress />
                    </Box>
                </>
            )
        }

        return (
            <React.Fragment>
                <div>
                    <p>Upload the annual report to complete the process:</p>

                    <input type='file' onChange={handleFileUpload} />

                    {uploadingFile ? <StepSpinner /> : null}
                    {successUploadingFile ? <Alert severity="success" sx={{ marginTop: '20px' }}>Annual report successfully saved!</Alert> : null}
                    {errorUploadingFile ? <Alert severity="error" sx={{ marginTop: '20px' }}>There was an error uploading the document</Alert> : null}
                </ div>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleSubmit}>Done</Button>
                </Box>
            </React.Fragment>
        )
    }

    async function readFileAsBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const dataUrl = reader.result as string;
                const base64 = dataUrl.split(',')[1];
                resolve(base64);
            });
            reader.addEventListener('error', () => {
                reject(reader.error);
            });
            reader.readAsDataURL(file);
        });
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
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ?
                <LastStep />
                :
                <React.Fragment>
                    <StepContent activeStep={activeStep} />
                </React.Fragment>
            }
        </Box >
    )
}

export default EditFinancialStatements