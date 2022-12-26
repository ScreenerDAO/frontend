import { gql, useQuery } from '@apollo/client'
import { Card, Grid, Link as MUILink } from '@mui/material'
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from 'src/helpers/generalMethods'
import { useAppDispatch } from 'src/hooks'
import { ICompanyEthData } from 'src/types/CompanyDataTypes'
import Link from 'next/link'

const COMPANIES_QUERY = gql`
    query Companies {
        companies {
            id
            name
            ticker
            dataHash
        }
    }
`

const RenderTicker = (params: {
    row: {
        id: number, 
        name: string, 
        ticker: string, 
        dataHash: string
    }
}) => {
    const dispatch = useAppDispatch()

    return (
        <Link href="/company-overview">
            <MUILink
                sx={{ textDecoration: 'underline', cursor: 'pointer'}}
                underline="always" 
                onClick={() => selectCompany(params.row, dispatch)}
            >
                {params.row.ticker}
            </MUILink>
        </Link>
    )
}

const columns: GridColumns = [
    { field: 'id', headerName: '#', width: 100, editable: false},
    { field: 'name', headerName: 'Name', width: 300, editable: false },
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker }
]

const ListCompanies = () => {
    const { loading, error, data } = useQuery<{ companies: ICompanyEthData[] }>(COMPANIES_QUERY)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Card style={{ height: '550px' }}>
                    <DataGrid
                        rows={data?.companies || []}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8, 16, 32]}
                        loading={loading}
                        error={error}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}

export default ListCompanies