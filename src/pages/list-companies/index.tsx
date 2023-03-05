import { Card, Grid } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import React from 'react'
import { selectCompany } from 'src/lib/generalMethods'
import { useAppDispatch } from 'src/hooks'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles';
import PageWrapper from 'src/layouts/components/PageWrapper'
import { IGetStaticPropsResult } from 'src/lib/getStaticProps'

const ListCompanies = ({ companies }: IGetStaticPropsResult) => {
    return (
        <PageWrapper companies={companies}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <DataGrid
                            rows={companies}
                            columns={columns}
                            sx={{ minHeight: '500px' }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

const RenderTicker = (params: {
    row: {
        id: number,
        name: string,
        ticker: string,
        dataHash: string
    }
}) => {
    const dispatch = useAppDispatch()
    const theme = useTheme();

    return (
        <Link
            href="/company-overview"
            onClick={() => selectCompany(params.row, dispatch)}
            style={{ color: theme.palette.primary.main }}
        >
            {params.row.ticker}
        </Link>
    )
}

const columns: GridColumns = [
    { field: 'id', headerName: '#', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 300, editable: false },
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker },
]

export { getStaticProps } from '../../lib/getStaticProps'

export default ListCompanies