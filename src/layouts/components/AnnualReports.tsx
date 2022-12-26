import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridColumns, GridEventListener, GridRenderCellParams, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid';
import { ICompanyData } from 'src/types/CompanyDataTypes';
import { getYearsArray } from 'src/helpers/financialStatements';
import Image from 'next/image'

interface IAnnualReportsProps {
    data: ICompanyData
}

const RenderPdfIcon = (props: GridRenderCellParams) => {
    console.log(props.row)
    if (props.row.pdfLink && props.row.pdfLink !== '-') {
        return (
            <a href={`https://ipfs.io/ipfs/${props.row.pdfLink}`} target="_blank">
                <Image width={40} height={40} src="/images/pdf.png" alt="PDF icon" /> 
            </a>
        )
    } else {
        return <div>-</div>
    }
}

const AnnualReports = (props: IAnnualReportsProps) => {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const columns: GridColumns = [
        { field: 'year', headerName: 'Year', width: 100, editable: false },
        { field: 'ipfsLink', headerName: 'IPFS link', width: 200, editable: false },
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
                    ipfsLink: props.data.financialStatements[year].annualReportHash ?? '-',
                    pdfLink: props.data.financialStatements[year].annualReportHash
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

