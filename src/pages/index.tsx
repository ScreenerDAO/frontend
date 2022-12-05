// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import React from 'react'
import { setCompanyData } from 'src/features/companyDataSlice'
import FinancialStatements from 'src/layouts/components/FinancialStatements'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { Card } from '@mui/material'

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
    return (
        <div style={{
            height: '400px', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div style={{textAlign: 'center'}}>Select a company to dispay it's financials</div>
        </div>
    )
}

export default Dashboard
