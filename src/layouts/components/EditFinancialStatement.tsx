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
import { UploadOutlined } from '@ant-design/icons';
import { Button as AntButton, Upload } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { NFTStorage } from 'nft.storage';
import { nftStorageApiKey } from 'src/metadata';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setAnnualReportHash } from 'src/features/newCompanyDataSlice';

const steps = ['Balance sheet', 'Income statement', 'Cash flow statement'];

interface IEditFinancialStatementsProps {
    year: number
    closeModal: () => void
}

const EditFinancialStatements = (props: IEditFinancialStatementsProps): React.ReactElement => {
    const [activeStep, setActiveStep] = React.useState(0);

    const dispatch = useAppDispatch()

    const file = useAppSelector((state) => state.newCompanyData.financialStatements[props.year].annualReportHash)

    const uploadProps: UploadProps = {
        defaultFileList: file ? [{uid: '1', name: file, status: 'done'}] : [],
    }

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

    const handleFileUpload = async (params: UploadChangeParam<UploadFile<any>>) => {
        if (params.file.originFileObj) {
            let client = new NFTStorage({ token: nftStorageApiKey })

            let hash = await client.store({
                name: params.file.name,
                description: params.file.name,
                image: params.file.originFileObj as any
            })
            
            dispatch(setAnnualReportHash({ year: props.year, hash: hash.ipnft }))
        }
    }

    const handleFileRemove = async (params: UploadFile<any>) => {
        if (file == params.name) {
            dispatch(setAnnualReportHash({ year: props.year, hash: '' }))
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
                        <div>
                            <p>Upload the annual report to complete the process:</p>

                            <Upload {...uploadProps} maxCount={1} onChange={handleFileUpload} onRemove={handleFileRemove}>
                                <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                            </Upload>
                        </ div>

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