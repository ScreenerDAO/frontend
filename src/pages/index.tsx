import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useAppSelector } from 'src/hooks'
import React from 'react'
import FinancialStatements from 'src/layouts/components/FinancialStatements'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { Card, CircularProgress } from '@mui/material'
import SearchBar from 'src/layouts/components/SearchBar'
import { IGeneral } from 'src/features/general'

const Dashboard = () => {
    const data = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)

    return (
        <ApexChartWrapper>
            {data.companyName == "" && data.ticker == "" ?
                <EmptyCompanyDashboard />
                :
                <CompanyDashboard data={data} />
            }
        </ApexChartWrapper>
    )
}

const CompanyDashboard = (props: { data: ICompanyData }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'none' }, marginBottom: '10px' }}>
                <SearchBar />
            </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <h2 style={{ marginLeft: '40px' }}>{props.data.companyName}</h2>
                </Card>
            </Grid>

            <FinancialStatements companyData={props.data} />
        </Grid>
    )
}

const EmptyCompanyDashboard = () => {
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    if (companyLoading) {
        return (
            <div style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}><CircularProgress /></div>
        )
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'none' }, marginBottom: '10px' }}>
                    <SearchBar />
                </Grid>

                <Grid item xs={12} md={12}>
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>Select a company to dispay it's financials</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
