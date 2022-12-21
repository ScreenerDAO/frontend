import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { IGeneral, setIsNewCompany } from 'src/features/general'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { Button, CircularProgress, Grid, Tab, Tabs, TextField } from '@mui/material'
import { setCompanyCountry, setCompanyData, setCompanyName, setCompanyTicker } from 'src/features/newCompanyDataSlice'
import FinancialStatementsList from 'src/layouts/components/FinancialStatementsList'
import SaveDataModal from 'src/layouts/components/SaveDataModal'
import { initialState } from 'src/features/newCompanyDataSlice'
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchBar from 'src/layouts/components/SearchBar'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EditRecords = () => {
    const [saveDataModalOpen, setSaveDataModalOpen] = useState(false)
    const [tabIndex, setTabIndex] = React.useState(0)

    const dispatch = useAppDispatch()

    const newCompany = useAppSelector((state: { general: IGeneral }) => state.general.isNewCompany)
    const companyData = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    const CompanyDashboard = () => {
        return (
            <>
                <Grid item xs={12} md={12}>
                    <Card style={{ display: 'flex' }}>
                        <Title />

                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '15px' }}>
                            <Button
                                variant='contained'
                                color="secondary"
                                onClick={() => {
                                    if (newCompany) {
                                        dispatch(setCompanyData(initialState))
                                    }
                                    else {
                                        dispatch(setCompanyData(companyData))
                                    }
                                }}
                                sx={{ display: { xs: 'none', md: 'block' } }}
                            >Reset</Button>

                            <DeleteOutlineIcon
                                onClick={() => {
                                    if (newCompany) {
                                        dispatch(setCompanyData(initialState))
                                    }
                                    else {
                                        dispatch(setCompanyData(companyData))
                                    }
                                }}
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
                            </React.Fragment>
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                            <FinancialStatementsList />
                        </TabPanel>
                    </Card>
                </Grid>

                {saveDataModalOpen ? <SaveDataModal handleClose={() => setSaveDataModalOpen(false)} /> : null}
            </>
        )
    }

    const Title = () => {
        const companyName = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["companyName"] as string)
        const companyTicker = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData["ticker"] as string)

        return (
            <div>
                <h2 style={{ marginLeft: '30px' }}>
                    {(companyName == "" && companyTicker == "") ? "New company" : `${companyName} (${companyTicker})`}
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

    return (
        <>
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
        </>
    )
}

export default EditRecords
