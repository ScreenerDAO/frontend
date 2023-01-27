import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import React from 'react'
import FinancialStatements from 'src/layouts/components/FinancialStatements'
import { ICompanyData, ICompanyEthData } from 'src/types/CompanyDataTypes'
import { Box, Card, CircularProgress, Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, Table, TableRow, Link as MUILink } from '@mui/material'
import SearchBar from 'src/layouts/components/SearchBar'
import { IGeneral } from 'src/features/general'
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { gql, useQuery } from '@apollo/client'
import { selectCompany } from 'src/helpers/generalMethods'
import Link from 'next/link'

const getEventCell = (eventType: string) => {
    if (eventType === "AddComapny") {
        return <div style={{ color: 'green' }}>Company added</div>
    } 
    if (eventType === "EditCompany") {
        return <div style={{ color: 'orange' }}>Company edited</div>
    }
}

function timePassed(timestamp: number): string {
    const currentTime = Date.now() / 1000; // convert to UNIX timestamp
    const timeDiff = currentTime - timestamp;
    if (timeDiff < 86400) {
        return "today";
    } else if (timeDiff < 604800) {
        return `${Math.floor(timeDiff / 86400)} days ago`;
    } else if (timeDiff < 2592000) {
        return `${Math.floor(timeDiff / 604800)} weeks ago`;
    } else if (timeDiff < 31536000) {
        return `${Math.floor(timeDiff / 2592000)} months ago`;
    } else {
        return `${Math.floor(timeDiff / 31536000)} years ago`;
    }
}


const EVENTS_QUERY = gql`
    query Events {
        events(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
            id
            companyId
            blockTimestamp
            eventType
        }
    }
`

const formatter = (value: number) => <CountUp end={value} separator="," />;

const Dashboard = () => {
    const companies = useAppSelector((state: { general: IGeneral }) => state.general.companies)
    const { loading, error, data } = useQuery<{ events: { id: string, companyId: number, blockTimestamp: number, eventType: string }[] }>(EVENTS_QUERY)
    const idToCompany = useAppSelector((state: { general: IGeneral }) => state.general.idToCompany)

    const dispatch = useAppDispatch()

    return (
        <ApexChartWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ paddingTop: "10px", paddingBottom: "10px", display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        {companies ?
                            <Statistic title="Companies registered" value={companies.length} formatter={formatter as any} />
                            :
                            <Skeleton variant="rounded" width={120} height={50} />
                        }

                        {companies ?
                            <Statistic title="Financials added" value={100} formatter={formatter as any} />
                            :
                            <Skeleton variant="rounded" width={120} height={50} />
                        }
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card>
                        <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                            Recent activity
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                            Top companies
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card>
                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Company</TableCell>
                                        <TableCell align="center">Transaction type</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {loading ? <CircularProgress /> : data?.events.map((row) => (
                                        <TableRow
                                            key={row.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link href="/company-overview">
                                                    <MUILink
                                                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                        underline="always"
                                                        onClick={() => selectCompany(idToCompany?.[row.companyId] as ICompanyEthData, dispatch)}
                                                    >
                                                        {idToCompany?.[row.companyId].ticker}
                                                    </MUILink>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">{getEventCell(row.eventType)}</TableCell>
                                            <TableCell align="right">{timePassed(row.blockTimestamp)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}

export default Dashboard
