import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../hooks';
import { ICompanyData } from 'src/types/CompanyDataTypes';
import { Alert, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { NFTStorage } from 'nft.storage';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { nftStorageApiKey, registriesContractAddress, registriesContractABI } from 'src/metadata'
import { IGeneral } from 'src/features/general';

interface ISaveDataModalProps {
    handleClose: () => void
}

const SaveDataModal = (props: ISaveDataModalProps) => {
    const [errors, setErrors] = React.useState<React.ReactElement[] | null>(null)
    const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

    React.useEffect(() => {
        const callback = async () => {
            let localErrors: React.ReactElement[] = []
            let hasErrors = false

            if (newCompanyData.companyName == null || newCompanyData.companyName == "") {
                hasErrors = true
                localErrors.push(<Alert key="1" severity='error' style={{ marginBottom: '10px' }}>Company name must be set</Alert>)
            }

            if (newCompanyData.ticker == null || newCompanyData.ticker == "") {
                hasErrors = true
                localErrors.push(<Alert key="2" severity='error' style={{ marginBottom: '10px' }}>Company ticker must be set</Alert>)
            }

            if (newCompanyData.country == null || newCompanyData.country == "") {
                hasErrors = true
                localErrors.push(<Alert key="3" severity='error' style={{ marginBottom: '10px' }}>Company country must be set</Alert>)
            }

            // if (newCompanyData.financialStatements == undefined || getYearsArray(newCompanyData.financialStatements).length == 0) {
            //     localErrors.push(<Alert key="4" severity='warning' style={{ marginBottom: '10px' }}>Company doesn't have any financials</Alert>)
            // }

            setErrors(localErrors)
        }

        callback()
    }, [newCompanyData])

    return (
        <Dialog
            open={true}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Saving data...</DialogTitle>

            <DialogContent>
                {(errors == null || errors!.length > 0) ?
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {<>{errors}</>}
                    </Box>
                    :
                    <SaveDataStepper newCompanyData={newCompanyData} />
                }
            </DialogContent>

            <DialogActions>
                <Button onClick={props.handleClose} autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

const SaveDataStepper = (props: { newCompanyData: ICompanyData }) => {
    const [state, setState] = React.useState<{ activeStep: number, cid: string }>({
        activeStep: 0,
        cid: ""
    })
    const companyId = useAppSelector((state: { general: IGeneral }) => state.general.selectedId)
    const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.companyName)
    const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.ticker)
    const isNewCompany = useAppSelector((state: { general: IGeneral }) => state.general.isNewCompany)

    const {
        config,
        error: prepareError,
        isError: isPrepareError
    } = usePrepareContractWrite({
        address: registriesContractAddress,
        abi: registriesContractABI,
        functionName: isNewCompany ? 'addNewCompany' : 'editCompany',
        args: isNewCompany ? [companyName, companyTicker, state.cid] : [companyId, companyName, companyTicker, state.cid]
    })

    const { data, error, isError, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    React.useEffect(() => {
        const callback = async () => {
            if (state.activeStep == 0) {
                let client = new NFTStorage({ token: nftStorageApiKey })
                let hash = await client.storeBlob(new Blob([JSON.stringify(props.newCompanyData)]))

                if (hash) {
                    setState(prevState => ({
                        ...prevState,
                        activeStep: 1,
                        cid: hash
                    }))
                }
            }

            if (state.activeStep == 1) {
                write?.()
            }
        }

        callback()
    }, [state.activeStep])

    React.useEffect(() => {
        if (isSuccess) {
            setState(prevState => ({
                ...prevState,
                activeStep: 2
            }))
        }
    }, [isSuccess])

    return (
        <Stepper activeStep={state.activeStep} orientation="vertical">
            <Step key='Saving data on Filecoin network'>
                <StepLabel>Saving data on Filecoin network</StepLabel>

                <StepContent>
                    <StepSpinner />
                </StepContent>
            </Step>

            <Step key='Updating company status on Ethereum network'>
                <StepLabel>Updating company status on Ethereum network</StepLabel>

                <StepContent>
                    {(isPrepareError || isError) ?
                        <>
                            <Alert severity='error' style={{ marginBottom: '10px' }}>{(prepareError || error)?.message}</Alert>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant='contained' onClick={() => write?.()}>Try again</Button>
                            </div>
                        </>
                        :
                        <StepSpinner />
                    }
                </StepContent>
            </Step>

            {state.activeStep == 2 &&
                <Alert severity="success" sx={{ marginTop: '20px' }}>Company successfully saved!</Alert>
            }
        </Stepper>
    )
}

const StepSpinner = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default SaveDataModal
