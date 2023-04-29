import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { IGeneral } from 'src/features/general'
import ICompanyData from 'src/types/ICompanyData'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, Tab, Tabs, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { setCompanyCountry, setCompanyCurrency, setCompanyData, setCompanyIsin, setCompanyName, setCompanyTicker, setCompanyWikipediaPage } from 'src/features/newCompanyDataSlice'
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
import { getStaticProps } from '../../lib/getStaticProps'
import { getISOCountries, getISOCurrencies } from 'src/lib/generalMethods'

const EditRecords = ({ companies }: {
    companies: ICompanyEthData[]
}) => {
    const [saveDataModalOpen, setSaveDataModalOpen] = useState(false)
    const [resetDataModalOpen, setResetDataModalOpen] = useState(false)
    const [tabIndex, setTabIndex] = React.useState(0)
    const [countriesList, setCountriesList] = React.useState<string[]>([])
    const [currenciesList, setCurrenciesList] = React.useState<string[]>([])

    const store = useStore<RootState>()
    const dispatch = useAppDispatch()
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    React.useEffect(() => {
        getISOCountries().then(res => setCountriesList(res.sort()))
        getISOCurrencies().then(res => setCurrenciesList(res.sort()))
    }, [])

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
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <CompanyName />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <CompanyTicker />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <CompanyCountry countries={countriesList} />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <CompanyCurrency currencies={currenciesList} />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <CompanyWikipediaPage />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <CompanyIsin />
                                </Grid>
                            </Grid>
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
                label="Company name"
                variant="outlined"
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
                variant='outlined'
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyTicker}
                onChange={ev => dispatch(setCompanyTicker(ev.target.value))}
                fullWidth
            />
        )
    }

    const CompanyCountry = ({ countries }: {
        countries: string[]
    }) => {
        const companyCountry = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.country)

        return (
            <FormControl sx={{ marginTop: '10px' }} fullWidth>
                <InputLabel>Contry</InputLabel>
                <Select
                    required
                    label="Country"
                    variant="outlined"
                    value={companyCountry}
                    onChange={ev => dispatch(setCompanyCountry(ev.target.value))}
                >
                    {countries.map((country, index) => <MenuItem value={country} key={index}>{country}</MenuItem>)}
                </Select>
            </FormControl>
        )
    }

    const CompanyWikipediaPage = () => {
        const companyDescription = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.wikipediaPage)

        return (
            <TextField
                label="Wikipedia page"
                variant="outlined"
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyDescription}
                onChange={ev => dispatch(setCompanyWikipediaPage(ev.target.value))}
                fullWidth
            />
        )
    }

    const CompanyIsin = () => {
        const companyIsin = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.isin)

        return (
            <TextField
                label="Isin"
                variant="outlined"
                autoComplete='off'
                style={{
                    marginTop: '10px'
                }}
                value={companyIsin}
                onChange={ev => dispatch(setCompanyIsin(ev.target.value))}
                fullWidth
            />
        )
    }

    const CompanyCurrency = ({currencies}: {
        currencies: string[]
    }) => {
        const companyCurrency = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.currency)

        return (
            <FormControl sx={{ marginTop: '10px' }} fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                    required
                    label="Currency"
                    variant='outlined'
                    value={companyCurrency}
                    onChange={ev => dispatch(setCompanyCurrency(ev.target.value as unknown as number))}
                >
                    {currencies.map((currency, index) => <MenuItem value={currency} key={index}>{currency}</MenuItem>)}
                </Select>
            </FormControl>
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

export { getStaticProps }

export default EditRecords
