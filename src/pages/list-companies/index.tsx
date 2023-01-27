import { gql, useQuery } from '@apollo/client'
import { Card, Grid, Link as MUILink } from '@mui/material'
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from 'src/helpers/generalMethods'
import { useAppDispatch, useAppSelector } from 'src/hooks'
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
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker },
]

const ListCompanies = () => {
    // const { loading, error, data } = useQuery<{ companies: ICompanyEthData[] }>(COMPANIES_QUERY)
    const companies = useAppSelector(state => state.general.companies)
    const loading = useAppSelector(state => state.general.companyLoading)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Card>
                    <DataGrid
                        rows={companies ?? []}
                        columns={columns}
                        loading={loading}
                        sx={{minHeight: '500px'}}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}

export default ListCompanies