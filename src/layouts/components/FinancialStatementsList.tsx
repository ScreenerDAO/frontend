import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Dialog, Box, Button, Typography, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns, GridEventListener, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer, MuiEvent } from '@mui/x-data-grid';
import EditFinancialStatements from './EditFinancialStatement';
import { ICompanyData, IFinancialStatement } from 'src/types/CompanyDataTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewYear } from 'src/features/newCompanyDataSlice';

const getYearsArray = (financials: { [key: number]: IFinancialStatement }) => {
    if (!financials) return []

    return Object.keys(financials).map(key => Number(key)).sort()
}

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

const FinancialStatementsList = () => {
    const [editFinancialsModal, setEditFinancialsModal] = React.useState<boolean>(false)
    const [selectedYear, setSelectedYear] = React.useState<number>(0)

    const handleEditClick = (id: GridRowId) => () => {
        setSelectedYear(id as number)
        setEditFinancialsModal(true)
    };

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const YearsList = () => {
        const [rows, setRows] = React.useState<GridRowsProp>([]);
        const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

        const financials = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements)

        React.useEffect(() => {
            const initialRows = []

            const yearsArray = getYearsArray(financials)

            for (const year of yearsArray) {
                initialRows.push({
                    id: year,
                    year: year,
                    balanceSheet: financials[year].balanceSheet != undefined,
                    incomeStatement: financials[year].incomeStatement != undefined,
                    cashFlowStatement: financials[year].cashFlow != undefined,
                    annualReport: financials[year].annualReportHash != undefined
                })
            }

            setRows(initialRows)
        }, [financials])

        const handleSaveClick = (id: GridRowId) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        };

        const handleDeleteClick = (id: GridRowId) => () => {
            setRows(rows.filter((row) => row.id !== id));
        };

        const handleCancelClick = (id: GridRowId) => () => {
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            });

            const editedRow = rows.find((row) => row.id === id);
            if (editedRow!.isNew) {
                setRows(rows.filter((row) => row.id !== id));
            }
        };

        const columns: GridColumns = [
            { field: 'year', headerName: 'Year', editable: true },
            { field: 'balanceSheet', headerName: 'BalanceSheet', type: 'boolean', width: 220 },
            { field: 'incomeStatement', headerName: 'IncomeStatement', type: 'boolean', width: 220, editable: false },
            { field: 'cashFlowStatement', headerName: 'Cash flow statement', type: 'boolean', width: 220, editable: false },
            { field: 'annualReport', headerName: 'Annual report', type: 'boolean', width: 220, editable: false },
            {
                field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
                getActions: ({ id }) => {
                    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                label="Save"
                                onClick={handleSaveClick(id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />,
                        ];
                    }

                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ];

        const processRowUpdate = (newRow: GridRowModel) => {
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        };

        return (
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                components={{
                    Toolbar: EditToolbar,
                }}
                componentsProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'year', sort: 'asc' }]
                    }
                }}
            />
        )
    }

    const UpdateYearFinancialsModal = () => {
        return (
            <Dialog
                open={editFinancialsModal}
                onClose={() => setEditFinancialsModal(false)}
            >
                <Box sx={{    
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '90vh',
                    paddingLeft: { xs: '10px', sm: '25px' },
                    paddingRight: { xs: '10px', sm: '25px' },
                    paddingTop: '25px',
                    paddingBottom: '25px',
                    overflowY: 'auto'
                }}>
                    <EditFinancialStatements year={selectedYear} closeModal={() => setEditFinancialsModal(false)} />
                </Box>
            </Dialog>
        )
    }

    return (
        <Box
            sx={{
                height: 500,
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <YearsList />

            <UpdateYearFinancialsModal />
        </Box>
    );
}

const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;
    const [newYearModalOpen, setNewYearModalOpen] = React.useState(false);
    const dispatch = useAppDispatch()

    const addRecordListener = (newYear: number) => {
        dispatch(addNewYear(newYear))

        setRows((oldRows) => [...oldRows, {
            id: newYear,
            year: newYear,
            balanceSheet: false,
            incomeStatement: false,
            cashFlow: false
        }])

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newYear]: { mode: GridRowModes.View, fieldToFocus: 'name' }
        }))
    }

    const NewYearModal = () => {
        const [newYear, setNewYear] = React.useState<number>(2020)


        return (
            <Dialog
                open={newYearModalOpen}
                onClose={() => setNewYearModalOpen(false)}
            >
                <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        What year financial data do you want to add?
                    </Typography>

                    <TextField
                        id="filled-number"
                        label="Year"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        style={{
                            width: '200px',
                            marginTop: '20px',
                            alignSelf: 'center'
                        }}
                        value={newYear}
                        onChange={(ev) => setNewYear(Number(ev.target.value))}
                    />

                    <Button
                        variant="contained"
                        style={{
                            width: '120px',
                            marginTop: '25px',
                            alignSelf: 'center'
                        }}
                        onClick={() => {
                            addRecordListener(newYear)
                            setNewYearModalOpen(false)
                        }}
                    >
                        Add year
                    </Button>
                </Box>
            </Dialog>
        )
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={() => setNewYearModalOpen(true)}>Add record</Button>

            <NewYearModal />
        </GridToolbarContainer>
    );
}

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     bgcolor: 'background.paper',
//     border: '1 px solid grey',
//     borderRadius: '10px',
//     boxShadow: 24,
//     p: 4,
//     display: 'flex',
//     flexDirection: 'column'
// };

const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1 px solid grey',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh'
};

export default FinancialStatementsList