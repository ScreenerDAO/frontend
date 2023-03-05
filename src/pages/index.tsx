import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import React from 'react'
import ICompanyEthData from 'src/types/ICompanyEthData'
import { Box, Card, Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, Table, TableRow, useTheme } from '@mui/material'
import { IGeneral } from 'src/features/general'
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { selectCompany } from 'src/lib/generalMethods'
import Link from 'next/link'
import { IGetStaticPropsResult } from '../lib/getStaticProps'
import type IEvent from 'src/types/IEvent'
import PageWrapper from 'src/layouts/components/PageWrapper'

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

const formatter = (value: number) => <CountUp end={value} separator="," />;

const Dashboard = (props: IGetStaticPropsResult) => {
    const { companies, events } = props

    return (
        <PageWrapper {...props}>
            <ApexChartWrapper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card sx={{ paddingTop: "10px", paddingBottom: "10px", display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            {companies?.length ?
                                <Statistic title="Companies registered" value={companies.length} formatter={formatter as any} />
                                :
                                <Skeleton variant="rounded" width={120} height={50} />
                            }

                            {companies?.length ?
                                <Statistic title="Financials added" value={100} formatter={formatter as any} />
                                :
                                <Skeleton variant="rounded" width={120} height={50} />
                            }
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                                Recent activity
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card>
                            <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                                Leaderboard
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <RecentActivityTable events={events} />
                        </Card>
                    </Grid>
                </Grid>
            </ApexChartWrapper>
        </PageWrapper>
    )
}

const RecentActivityTable = ({ events }: {
    events: IEvent[]
}) => {
    const idToCompany = useAppSelector((state: { general: IGeneral }) => state.general.idToCompany)
    const dispatch = useAppDispatch()
    const theme = useTheme()

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
                    {events.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                <Link
                                    href="/company-overview"
                                    onClick={() => selectCompany(idToCompany?.[row.companyId] as ICompanyEthData, dispatch)}
                                    style={{ color: theme.palette.primary.main }}
                                >
                                    {idToCompany?.[row.companyId].ticker}
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

{/* <TableBody>
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
</TableBody> */}

// const RecentActivityTableLoadingRow = () => {
//     return (
//         <TableRow>
//             <TableCell>
//                 <Skeleton variant="text" />
//             </TableCell>
//             <TableCell>
//                 <Skeleton variant="text" />
//             </TableCell>
//             <TableCell>
//                 <Skeleton variant="text" />
//             </TableCell>
//         </TableRow>
//     )
// }

export { getStaticProps } from '../lib/getStaticProps'

export default Dashboard
