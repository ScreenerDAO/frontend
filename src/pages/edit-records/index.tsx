import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { IGeneral } from 'src/features/general'
import ICompanyData from 'src/types/ICompanyData'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Tab, Tabs, TextField } from '@mui/material'
import { setCompanyCountry, setCompanyData, setCompanyName, setCompanyTicker } from 'src/features/newCompanyDataSlice'
import FinancialStatementsList from 'src/layouts/components/FinancialStatements/FinancialStatementsList'
import SaveDataModal from 'src/layouts/components/SaveDataModal'
import { initialState } from 'src/features/newCompanyDataSlice'
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchBar from 'src/layouts/components/SearchBar'
import { TransitionProps } from '@mui/material/transitions'
import { useStore } from 'react-redux';
import { RootState } from 'src/store';
import ICompanyEthData from 'src/types/ICompanyEthData'
import PageWrapper from 'src/layouts/components/PageWrapper'
import type { IGetStaticPropsResult } from '../../lib/getStaticProps'

const EditRecords = ({ companies }: {
    companies: ICompanyEthData[]
}) => {
    const [saveDataModalOpen, setSaveDataModalOpen] = useState(false)
    const [resetDataModalOpen, setResetDataModalOpen] = useState(false)
    const [tabIndex, setTabIndex] = React.useState(0)

    const store = useStore<RootState>()
    const dispatch = useAppDispatch()
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    const resetData = () => {
        const companyData = store.getState().companyData

        if (companyData.id == null) {
            dispatch(setCompanyData(initialState))

            return
        }

        dispatch(setCompanyData(companyData))
    }

    const CompanyDashboard = () => (
        <>
            <Grid item xs={12} md={12}>
                <Card style={{ display: 'flex' }}>
                    <CompanyNameAndTicker />

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '15px' }}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={() => setResetDataModalOpen(true)}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >Reset</Button>

                        <DeleteOutlineIcon
                            onClick={() => setResetDataModalOpen(true)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                marginLeft: '15px',
                                fontSize: '35px'
                            }}
                        />

                        <Button
                            variant='contained'
                            color="primary"
                            style={{ marginLeft: '15px' }}
                            onClick={() => setSaveDataModalOpen(true)}
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >Submit</Button>

                        <SaveIcon
                            onClick={() => setSaveDataModalOpen(true)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                marginLeft: '15px',
                                fontSize: '35px'
                            }}
                        />
                    </div>
                </Card>
            </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <Tabs
                            value={tabIndex}
                            onChange={(event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                            aria-label="basic tabs example"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab label="Company info" {...a11yProps(0)} />
                            <Tab label="Financials" {...a11yProps(0)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabIndex} index={0}>
                        <React.Fragment>
                            <CompanyName />
                            <CompanyTicker />
                            <CompanyCountry />
                            {/* <CompanyCurrency /> */}
                        </React.Fragment>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        <FinancialStatementsList />
                    </TabPanel>
                </Card>
            </Grid>

            {saveDataModalOpen ? <SaveDataModal handleClose={() => setSaveDataModalOpen(false)} /> : null}
            {resetDataModalOpen ? <ResetDataModal open={resetDataModalOpen} handleClose={() => setResetDataModalOpen(false)} resetData={resetData} /> : null}
        </>
    )

    const a11yProps = (index: number) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    })
    
    const TabPanel = ({ children, value, index, ...other }: {
        children?: React.ReactNode;
        index: number;
        value: number;
    }) => (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>{children}</Box>
            )}
        </div>
    );

    const CompanyNameAndTicker = () => {
        const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["companyName"] as string)
        const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["ticker"] as string)
        const companyId = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.id)

        return (
            <div>
                <h2 style={{ marginLeft: '30px' }}>
                    {/* {(companyName == "" && companyTicker == "") ? "New company" : `${companyName} (${companyTicker})`} */}
                    {!companyId ? "New company" : `${companyName} (${companyTicker})`}
                </h2>
            </div>
        )
    }

    const CompanyName = () => {
        const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["companyName"])

        return (
            <TextField
                required
                id="address1"
                name="address1"
                label="Company name"
                variant="standard"
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyName}
                onChange={ev => dispatch(setCompanyName(ev.target.value))}
                fullWidth
            />
        )
    }

    const CompanyTicker = () => {
        const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["ticker"])

        return (
            <TextField
                required
                label="Ticker"
                variant='standard'
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyTicker}
                onChange={ev => dispatch(setCompanyTicker(ev.target.value))}
            />
        )
    }

    const CompanyCountry = () => {
        const companyCountry = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.country)

        return (
            <TextField
                required
                label="Country"
                variant="standard"
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyCountry}
                onChange={ev => dispatch(setCompanyCountry(ev.target.value))}
            />
        )
    }

    const ResetDataModal = ({
        open,
        handleClose,
        resetData
    }: {
        open: boolean,
        handleClose: () => void
        resetData: () => void
    }) => {
        return (
    
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to reset the data?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        All the data added deleted or updated in this session
                        will be lost
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => {
                        resetData()
                        handleClose()
                    }}>Agree</Button>
                </DialogActions>
            </Dialog>
        );
    }

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    // const CompanyCurrency = () => {
    //     const companyCurrency = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.currency)

    //     return (
    //         <FormControl>
    //             <InputLabel>Currency</InputLabel>

    //             <Select
    //                 label="Currency"
    //                 value={companyCurrency}
    //                 variant="standard"
    //                 style={{
    //                     marginTop: '10px'
    //                 }}
    //             >
    //                 {
    //                     Object.keys(currencies).map((currency, index) => {
    //                         return (
    //                             <MenuItem key={index} value={currency}>{currencies[Number(currency)].code}</MenuItem>
    //                         )
    //                     })
    //                 }
    //             </Select>
    //         </FormControl>
    //     )
    // }

    return (
        <PageWrapper companies={companies}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'none' }, marginBottom: '10px' }}>
                    <SearchBar />
                </Grid>

                {companyLoading ?
                    <div style={{
                        height: '300px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}><CircularProgress /></div>
                    :
                    <CompanyDashboard />
                }
            </Grid>
        </PageWrapper>
    )
}

export { getStaticProps } from '../../lib/getStaticProps'

export default EditRecords
