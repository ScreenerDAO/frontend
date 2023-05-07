'use client'

import { Card, Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from '@/lib/methods/generalMethods'
import { useAppDispatch } from '@/hooks'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles';
import { IRootLayoutParams } from '../layout'

const ListCompanies = (props: {
    params: IRootLayoutParams
}) => {
    const {companies} = props.params

    return (
        <Grid container spacing={3} sx={{ height: 'calc(100%)' }}>
            <Grid item xs={12} md={12}>
                <Card>
                    <DataGrid
                        rows={companies}
                        columns={columns}
                        sx={{
                            height: {
                                xs: 'calc(100vh - 64px - 56px - 3rem)',
                                md: 'calc(100vh - 76px - 56px - 3rem)'
                            }
                        }}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}

const RenderTicker = (params: {
    row: {
        id: number,
        name: string,
        ticker: string,
        dataHash: string,
        isDelisted: boolean
    }
}) => {
    const dispatch = useAppDispatch()
    const theme = useTheme();

    return (
        <Link
            href={`/company-overview?id=${params.row.id}`}
            onClick={() => selectCompany(params.row, dispatch)}
            style={{ color: theme.palette.primary.main }}
        >
            {params.row.ticker === '' ? 'DELISTED' : params.row.ticker}
        </Link>
    )
}

const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 300, editable: false },
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker },
]

export default ListCompanies