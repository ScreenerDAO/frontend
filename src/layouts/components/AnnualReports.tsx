import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridEventListener, GridRenderCellParams, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid';
import { ICompanyData } from 'src/types/CompanyDataTypes';
import { getYearsArray } from 'src/helpers/financialStatements';
import Image from 'next/image'
import { Button } from '@mui/material';

const openIpfs = (ipfsLink: string) => {
    window.open(`https://ipfs.io/ipfs/${ipfsLink}`, '_blank')
}

const openReport = (pdfLink: string) => {
    window.open(`https://${pdfLink}.ipfs.w3s.link/`, '_blank')
}

interface IAnnualReportsProps {
    data: ICompanyData
}

const RenderIpfs = (props: GridRenderCellParams) => {
    if (props.row.ipfsLink && props.row.ipfsLink !== '-') {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <Image width={40} height={40} src="/images/pdf.png" alt="PDF icon" /> */}
                <Button variant="text" onClick={() => openIpfs(props.row.ipfsLink)}>Open report</Button>
            </div>
        )
    } else {
        return <div style={{ textAlign: 'center' }}>-</div>
    }
}

const RenderPdfIcon = (props: GridRenderCellParams) => {
    if (props.row.pdfLink && props.row.pdfLink !== '-') {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <Image width={40} height={40} src="/images/pdf.png" alt="PDF icon" /> */}
                <Button variant="text" onClick={() => openReport(props.row.pdfLink)}>Open report</Button>
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
        { field: 'ipfsLink', headerName: 'IPFS link', width: 200, editable: false, renderCell: RenderIpfs },
        { field: 'pdfLink', headerName: 'PDF link', width: 200, editable: false, renderCell: RenderPdfIcon }
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
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    )
}

export default AnnualReports

