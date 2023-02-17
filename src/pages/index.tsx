import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import React from 'react'
import { ICompanyEthData } from 'src/types/CompanyDataTypes'
import { Box, Card, Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, Table, TableRow, Link as MUILink } from '@mui/material'
import { IGeneral } from 'src/features/general'
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { gql, useQuery } from '@apollo/client'
import { selectCompany } from 'src/helpers/generalMethods'
import Link from 'next/link'

const getEventCell = (eventType: string) => {
    if (eventType === "AddComapny") {
        return <div style={{ color: '#28a745' }}>Added</div>
    }
    if (eventType === "EditCompany") {
        return <div style={{ color: '#007bff' }}>Edited</div>
    }
}

function timePassed(timestamp: number): string {
    const currentTime = Date.now() / 1000; // convert to UNIX timestamp
    const timeDiff = currentTime - timestamp;

    if (timeDiff < 86400) {
        return "Today";
    }
    if (timeDiff < 604800) {
        const days = Math.floor(timeDiff / 86400);
        return days === 1 ? "Yesterday" : `${days} days ago`;
    }
    if (timeDiff < 2592000) {
        const weeks = Math.floor(timeDiff / 604800);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
    if (timeDiff < 31536000) {
        const months = Math.floor(timeDiff / 2592000);
        return months === 1 ? "1 month ago" : `${months} months ago`;
    }

    const years = Math.floor(timeDiff / 31536000);
    return years === 1 ? "1 year ago" : `${years} years ago`;
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

const RecentActivityTable = ({ data, loading }: {
    data: { events: { id: string, companyId: number, blockTimestamp: number, eventType: string }[] } | undefined,
    loading: boolean
}) => {
    const idToCompany = useAppSelector((state: { general: IGeneral }) => state.general.idToCompany)
    const dispatch = useAppDispatch()

    return (
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
                    {loading ?
                        Array(10).fill(0).map((_, index) => (
                            <RecentActivityTableLoadingRow key={index} />
                        ))
                        :
                        data?.events.map((row) => (
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
    )
}

const RecentActivityTableLoadingRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
        </TableRow>
    )
}

const Dashboard = () => {
    const companies = useAppSelector((state: { general: IGeneral }) => state.general.companies)
    const { loading, error, data } = useQuery<{ events: { id: string, companyId: number, blockTimestamp: number, eventType: string }[] }>(EVENTS_QUERY)

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
                        <RecentActivityTable data={data} loading={loading} />
                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}

export default Dashboard
