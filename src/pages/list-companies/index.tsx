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
            <Grid container spacing={3} sx={{height: 'calc(100%)'}}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <DataGrid
                            rows={companies}
                            columns={columns}
                            sx={{ minHeight: {
                                xs: 'calc(100vh - 64px - 56px - 3rem)',
                                md: 'calc(100vh - 76px - 56px - 3rem)'
                            } }}
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

const columns: GridColumns = [
    { field: 'id', headerName: '#', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 300, editable: false },
    { field: 'ticker', headerName: 'Ticker', width: 100, editable: false, renderCell: RenderTicker },
]

export { getStaticProps } from '../../lib/getStaticProps'

export default ListCompanies