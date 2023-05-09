import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '@/hooks';
import ICompanyData from '@/lib/types/ICompanyData';
import { Alert, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { setCompanyData } from '@/features/companyDataSlice';

const azureFunctionsEndpoint = process.env.NEXT_PUBLIC_AZURE_FUNCTIONS_ENDPOINT 
const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
const registriesContractAddress = process.env.NEXT_PUBLIC_REGISTRIES_CONTRACT_ADDRESS
const registriesContractABI = process.env.NEXT_PUBLIC_REGISTRIES_CONTRACT_ABI

interface ISaveDataModalProps {
    handleClose: () => void
}

const SaveDataModal = (props: ISaveDataModalProps) => {
    const [errors, setErrors] = React.useState<React.ReactElement[] | null>(null)
    const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

    React.useEffect(() => {
        const callback = async () => {
            const localErrors: React.ReactElement[] = []

            if (!newCompanyData.companyName || newCompanyData.companyName == "") {
                localErrors.push(<Alert key="1" severity='error' style={{ marginBottom: '10px' }}>Company name must be set</Alert>)
            }

            if (!newCompanyData.isDelisted && (!newCompanyData.ticker || newCompanyData.ticker == "")) {
                localErrors.push(<Alert key="2" severity='error' style={{ marginBottom: '10px' }}>Company ticker must be set</Alert>)
            }

            if (!newCompanyData.country || newCompanyData.country == "") {
                localErrors.push(<Alert key="3" severity='error' style={{ marginBottom: '10px' }}>Company country must be set</Alert>)
            }

            if (!newCompanyData.currency || newCompanyData.country == "") {
                localErrors.push(<Alert key="4" severity='error' style={{marginBottom: '10px'}}>Company currency must be set</Alert>)
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

interface ISaveDataStepperState {
    activeStep: number
    cid: string
}

const SaveDataStepper = ({newCompanyData}: { newCompanyData: ICompanyData }) => {
    const [state, setState] = React.useState<ISaveDataStepperState>({
        activeStep: 0,
        cid: ""
    })

    return (
        <>
            <Stepper activeStep={state.activeStep} orientation="vertical">
                <Step key='Saving data on Filecoin network'>
                    <StepLabel>Saving data on Filecoin network</StepLabel>

                    <StepContent>
                        <SaveDataToFilecoinStep
                            newCompanyData={newCompanyData}
                            state={state}
                            setState={(newState: ISaveDataStepperState) => setState(newState)}
                        />
                    </StepContent>
                </Step>

                <Step key='Updating company status on Ethereum network'>
                    <StepLabel>Updating company status on Ethereum network</StepLabel>

                    <StepContent>
                        <SaveDataToEthereumStep cid={state.cid} setState={setState} />
                    </StepContent>
                </Step>
            </Stepper>

            {state.activeStep == 2 &&
                <Alert severity="success" sx={{ marginTop: '20px' }}>Company successfully saved!</Alert>
            }
        </>
    )
}

const SaveDataToFilecoinStep = ({newCompanyData, state, setState}: {
    newCompanyData: ICompanyData
    state: ISaveDataStepperState
    setState: (newState: ISaveDataStepperState) => void
}) => {
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        const callback = async() => {
            const response = await fetch(`${azureFunctionsEndpoint}/SaveCompanyData`, {
                method: 'POST',
                body: JSON.stringify(newCompanyData) 
            })

            if (response.ok) {
                setState({
                    activeStep: 1,
                    cid: await response.text()
                })
            }
            else {
                setError(true)
            }
        }

        if (state.activeStep === 0) {
            callback()
        }
    }, [state.activeStep])

    if (error) {
        return <ErrorSavingFilecoin retry={() => {
            setState({...state, })
            setError(false)
        }} />
    }

    return <StepSpinner />
}

const ErrorSavingFilecoin = ({retry}: {retry: () => void}) => {
    return (
        <>
            <Alert severity='error' style={{ marginBottom: '10px' }}>Error saving company data!</Alert>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' onClick={retry}>Try again</Button>
            </div>
        </>
    )
}

const SaveDataToEthereumStep = (props: {
    cid: string,
    setState: React.Dispatch<React.SetStateAction<{
        activeStep: number;
        cid: string;
    }>>
}) => {
    const companyId = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.id)
    const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.companyName)
    const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.ticker)
    const newCompanyData = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData)

    const dispatch = useAppDispatch()
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const {
        config,
        error: prepareError,
        isError: isPrepareError
    } = usePrepareContractWrite({
        address: registriesContractAddress as any,
        abi: JSON.parse(registriesContractABI ?? ""),
        functionName: companyId ? 'editCompanyData' : 'addNewCompany',
        args: companyId ? [companyId, props.cid] : [companyName, companyTicker, props.cid],
        overrides: {
            gasLimit: 100000
        }
    })
    const { data, error, isError, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    const calledOnce = React.useRef(false)

    React.useEffect(() => {
        if (!(!write || isLoading)) {
            if (calledOnce.current) return

            if (!isConnected || chain?.id != chainId || (isPrepareError || isError)) return

            calledOnce.current = true

            write?.()
        }
    }, [isConnected, chain, isPrepareError, isError, write, isLoading])

    React.useEffect(() => {
        if (isSuccess) {
            props.setState(prevState => ({
                ...prevState,
                activeStep: 2
            }))

            dispatch(setCompanyData(newCompanyData))
        }
    }, [isSuccess])

    if (!isConnected) {
        return <WalletNotConnected />
    }

    if (chain?.id != chainId) {
        return <WrongChain />
    }

    if (isPrepareError || isError) {
        return (
            <>
                <Alert severity='error' style={{ marginBottom: '10px' }}>{(prepareError || error)?.message}</Alert>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => write?.()}>Try again</Button>
                </div>
            </>
        )
    }

    return <StepSpinner />
}

const WalletNotConnected = () => {
    return (
        <>
            <Alert severity='error' style={{ marginBottom: '10px' }}>Wallet not connected!</Alert>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ConnectButton />
            </div>
        </>
    )
}

const WrongChain = () => {
    const { switchNetwork } = useSwitchNetwork({
        chainId: Number(chainId)
    })

    return (
        <>
            <Alert severity='error' style={{ marginBottom: '10px' }}>Wrong network!</Alert>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' onClick={() => switchNetwork?.()}>Switch network</Button>
            </div>
        </>
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
