'use client'

import Grid from '@mui/material/Grid'
import React from 'react'
import ICompanyEthData from '@/lib/types/ICompanyEthData'
import { Box, Card, Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, Table, TableRow, useTheme } from '@mui/material'
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { selectCompany } from '@/lib/methods/generalMethods'
import Link from 'next/link'
import type IEvent from '@/lib/types/IEvent'
import { IRootLayoutParams } from './layout'
import { useAppDispatch } from '@/hooks'

export default function Home(props: {
    params: IRootLayoutParams
}) {
    const {companies, events} = props.params

    return (
        <main >
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

                    <Grid item xs={12} lg={4}>
                        <Card>
                            <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                                Recent activity
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={8} sx={{ display: { xs: 'none', lg: 'initial' } }}>
                        <Card>
                            <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                                Leaderboard
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Card>
                            <RecentActivityTable companies={companies} events={events} />
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={8} sx={{ display: { lg: 'none' } }}>
                        <Card>
                            <Box sx={{ width: '90%', marginLeft: '5%', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }}>
                                Leaderboard
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                        <Card>
                            <LeaderboardTable />
                        </Card>
                    </Grid>
                </Grid>
        </main>
    )
}

const formatter = (value: number) => <CountUp end={value} separator="," />;

const RecentActivityTable = ({ companies, events }: {
    companies: ICompanyEthData[]
    events: IEvent[]
}) => {
    const theme = useTheme()
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
                    {events.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                <Link
                                    href={`/company-overview?id=${row.companyId}`}
                                    onClick={() => selectCompany(companies?.[row.companyId], dispatch)}
                                    style={{ color: theme.palette.primary.main }}
                                >
                                    {companies?.[row.companyId].ticker !== "" ? companies?.[row.companyId].ticker : "DEL"}
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


const LeaderboardTable = () => {
    const Row = () => {
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Company</TableCell>
                        <TableCell align="center">Number of years</TableCell>
                        <TableCell align="right">Oldest year</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Array(10).fill(0).map((row, index) => {
                        return <Row key={index} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

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