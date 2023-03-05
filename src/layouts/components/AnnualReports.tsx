import * as React from 'react';
import { DataGrid, GridColumns, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import ICompanyData from 'src/types/ICompanyData';
import { getYearsArray } from 'src/lib/financialStatements';
import { Button } from '@mui/material';

const AnnualReports = ({data}: {
    data: ICompanyData
}) => {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const columns: GridColumns = [
        { field: 'year', headerName: 'Year', width: 100, editable: false },
        { field: 'ipfsLink', headerName: 'PDF link', flex: 1, headerAlign: 'center', align: 'center', editable: false, renderCell: RenderIpfs },
    ]

    React.useEffect(() => {
        const yearsArray = getYearsArray(data.financialStatements)

        if (yearsArray?.length > 0) {
            const initialRows = []

            for (const year of yearsArray) {
                initialRows.push({
                    id: year,
                    year: year,
                    ipfsLink: data.annualReports[year] ?? '-',
                    pdfLink: data.annualReports[year]
                })
            }

            setRows(initialRows)
        }
    }, [data])

    return (
        <div style={{ height: '500px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

const RenderIpfs = (props: GridRenderCellParams) => {
    const link = props.row.ipfsLink

    if (link && link !== '-') {
        return (
            <>
                <Button variant="text" onClick={() => openPDF(`https://${link}.ipfs.w3s.link/`)}>Link 1</Button>
                <Button variant="text" onClick={() => openPDF(`https://ipfs.io/ipfs/${link}`)}>Link 2</Button>
                <Button variant="text" onClick={() => openPDF(`https://ipfs.io/ipfs/${link}`)}>Link 3</Button>
            </>
        )
    } else {
        return <>-</>
    }
}

const openPDF = (url: string) => window.open(url, '_blank')

export default AnnualReports

