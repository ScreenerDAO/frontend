import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridEventListener, GridRenderCellParams, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid';
import { ICompanyData } from 'src/types/CompanyDataTypes';
import { getYearsArray } from 'src/helpers/financialStatements';
import Image from 'next/image'
import { Button } from '@mui/material';

const Link1 = (pdfLink: string) => {
    window.open(`https://${pdfLink}.ipfs.w3s.link/`, '_blank')
}

const Link2 = (hash: string) => {
    window.open(`https://nftstorage.link/ipfs/${hash}`, '_blank')
}

const Link3 = (ipfsLink: string) => {
    window.open(`https://ipfs.io/ipfs/${ipfsLink}`, '_blank')
}

interface IAnnualReportsProps {
    data: ICompanyData
}

const RenderIpfs = (props: GridRenderCellParams) => {
    if (props.row.ipfsLink && props.row.ipfsLink !== '-') {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <Image width={40} height={40} src="/images/pdf.png" alt="PDF icon" /> */}
                <Button variant="text" onClick={() => Link1(props.row.ipfsLink)}>Link 1</Button>
                <Button variant="text" onClick={() => Link2(props.row.ipfsLink)}>Link 2</Button>
                <Button variant="text" onClick={() => Link3(props.row.ipfsLink)}>Link 3</Button>
            </div>
        )
    } else {
        return <div style={{ textAlign: 'center' }}>-</div>
    }
}

const AnnualReports = (props: IAnnualReportsProps) => {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const columns: GridColumns = [
        { field: 'year', headerName: 'Year', width: 100, editable: false },
        { field: 'ipfsLink', headerName: 'PDF link',width: 300 ,headerAlign: 'center', editable: false, renderCell: RenderIpfs },
    ]

    React.useEffect(() => {
        const yearsArray = getYearsArray(props.data.financialStatements)

        if (yearsArray?.length > 0) {
            let initialRows = []

            for (const year of yearsArray) {
                initialRows.push({
                    id: year,
                    year: year,
                    ipfsLink: props.data.annualReports[year] ?? '-',
                    pdfLink: props.data.annualReports[year]
                })
            }

            setRows(initialRows)
        }
    }, [props.data])

    return (
        <div style={{ height: '500px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default AnnualReports

