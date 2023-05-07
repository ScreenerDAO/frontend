import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Dialog, Box, Button, Typography, TextField, Alert } from '@mui/material';
import { 
    DataGrid, 
    GridActionsCellItem, 
    GridColDef, 
    GridEventListener, 
    GridRowId, 
    GridRowModel, 
    GridRowModes, 
    GridRowModesModel, 
    GridRowParams, 
    GridRowsProp, 
    GridToolbarContainer, 
    GridValueFormatterParams, 
    MuiEvent 
} from '@mui/x-data-grid';
import EditFinancialStatements from './EditFinancialStatement';
import ICompanyData from '@/lib/types/ICompanyData';
import IFinancialStatement from '@/lib/types/IFinancialStatement';
import { StatementType } from '@/lib/types/IStatement';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addNewYear, deleteYear } from '@/features/newCompanyDataSlice';
import { useStore } from 'react-redux';
import { RootState } from '@/store';

const getYearsArray = (financials: { [key: number]: IFinancialStatement }) => {
    if (!financials) return []

    return Object.keys(financials).map(key => Number(key)).sort()
}

const FinancialStatementsList = () => {
    const [editFinancialsModalOpen, setEditFinancialsModalOpen] = React.useState<boolean>(false)
    const [selectedYear, setSelectedYear] = React.useState<number>(0)

    return (
        <Box sx={{
            height: 500,
            '& .actions': {
                color: 'text.secondary',
            },
            '& .textPrimary': {
                color: 'text.primary',
            },
        }}>
            <YearsList setSelectedYear={setSelectedYear} setEditFinancialsModal={setEditFinancialsModalOpen} />

            <UpdateYearFinancialsModal
                selectedYear={selectedYear}
                editFinancialsModalOpen={editFinancialsModalOpen}
                setEditFinancialsModalOpen={setEditFinancialsModalOpen}
            />
        </Box>
    );
}

const YearsList = ({setSelectedYear, setEditFinancialsModal}: {
    setSelectedYear: (id: number) => void,
    setEditFinancialsModal: (value: boolean) => void
}) => {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const annualReports = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.annualReports)
    const store = useStore<RootState>()

    const dispatch = useAppDispatch()

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

    React.useEffect(() => {
        const initialRows = []

        const financials = store.getState().newCompanyData.financialStatements
        const yearsArray = getYearsArray(financials)

        for (const year of yearsArray) {
            initialRows.push({
                id: year,
                year: year,
                balanceSheet: StatementType.BalanceSheet,
                incomeStatement: StatementType.IncomeStatement,
                cashFlowStatement: StatementType.CashFlowStatement,
                annualReport: annualReports[year] != undefined
            })
        }

        setRows(initialRows)
    }, [])

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));

        dispatch(deleteYear(id as number))
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

    const RenderStatement = (params: GridValueFormatterParams<StatementType>) => {
        const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[params.id as number]?.[params.value as StatementType])

        if (element) {
            return Object.keys(element).length > 0
        }

        return true
    }

    const RenderReport = (params: GridValueFormatterParams<StatementType>) => {
        const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.annualReports[params.id as number])

        if (element) {
            return true
        }

        return false
    }

    const columns: GridColDef[] = [
        { field: 'year', headerName: 'Year', editable: true, flex: 1, minWidth: 220 },
        { field: 'balanceSheet', headerName: 'BalanceSheet', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'incomeStatement', headerName: 'IncomeStatement', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'cashFlowStatement', headerName: 'Cash flow statement', type: 'boolean', width: 220, editable: false, valueGetter: RenderStatement },
        { field: 'annualReport', headerName: 'Annual report', type: 'boolean', width: 220, editable: false, valueGetter: RenderReport },
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
                            key={1}
                        />,
                        <GridActionsCellItem 
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                            key={2}
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
                        key={1}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                        key={2}
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
                Toolbar: (props: EditToolbarProps) => (
                    <EditToolbar 
                        editToolbarProps={props} 
                        setSelectedYear={setSelectedYear} 
                        setEditFinancialsModal={setEditFinancialsModal} 
                    />
                )
            }}
            componentsProps={{
                toolbar: { setRows, setRowModesModel },
            }}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'year', sort: 'asc' }]
                }
            }}
        />
    )
}

interface IEditToolbarProps {
    editToolbarProps: EditToolbarProps
    setSelectedYear: (year: number) => void
    setEditFinancialsModal: (open: boolean) => void
}

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

const EditToolbar = (props: IEditToolbarProps) => {
    const { setRows, setRowModesModel } = props.editToolbarProps;
    const [newYearModalOpen, setNewYearModalOpen] = React.useState(false);
    const dispatch = useAppDispatch()

    const addRecordListener = (newYear: number) => {
        dispatch(addNewYear(newYear))

        setRows((oldRows) => [...oldRows, {
            id: newYear,
            year: newYear,
            balanceSheet: StatementType.BalanceSheet,
            incomeStatement: StatementType.IncomeStatement,
            cashFlowStatement: StatementType.CashFlowStatement,
            annualReport: false
        }])

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newYear]: { mode: GridRowModes.View, fieldToFocus: 'name' }
        }))
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={() => setNewYearModalOpen(true)}>Add record</Button>

            <NewYearModal 
                newYearModalOpen={newYearModalOpen} 
                setNewYearModalOpen={setNewYearModalOpen} 
                addRecordListener={addRecordListener}
                parentProps={props}
            />
        </GridToolbarContainer>
    );
}

const NewYearModal = ({newYearModalOpen, setNewYearModalOpen, addRecordListener, parentProps}: {
    newYearModalOpen: boolean,
    setNewYearModalOpen: (value: boolean) => void
    addRecordListener: (newYear: number) => void
    parentProps: IEditToolbarProps
}) => {
    const [newYear, setNewYear] = React.useState<number>()
    const [error, setError] = React.useState(false)

    const store = useStore<RootState>()

    const submit = () => {
        if (newYear) {
            if (Object.keys(store.getState().newCompanyData.financialStatements).map(key => Number(key)).includes(newYear)) {
                setError(true)

                return
            }

            addRecordListener(newYear)
        }

        setNewYearModalOpen(false)
        parentProps.setSelectedYear(newYear as number)
        parentProps.setEditFinancialsModal(true)
    }

    return (
        <Dialog
            open={newYearModalOpen}
            onClose={() => setNewYearModalOpen(false)}
        >
            <form onSubmit={submit} style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    What year financial data do you want to add?
                </Typography>

                <TextField
                    label="Year"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    sx={{
                        width: '200px',
                        marginTop: '20px',
                        alignSelf: 'center'
                    }}
                    value={newYear}
                    onChange={(ev) => setNewYear(Number(ev.target.value))}
                    autoFocus
                />

                {error ? <Alert severity="error" sx={{ marginTop: '20px' }}>Selected year already exists</Alert> : null}

                <Button
                    variant="contained"
                    style={{
                        width: '120px',
                        marginTop: '25px',
                        alignSelf: 'center'
                    }}
                    onClick={submit}
                >
                    Add year
                </Button>
            </form>
        </Dialog>
    )
}

const UpdateYearFinancialsModal = ({
    selectedYear,
    editFinancialsModalOpen,
    setEditFinancialsModalOpen
}: {
    selectedYear: number,
    editFinancialsModalOpen: boolean,
    setEditFinancialsModalOpen: (value: boolean) => void
}) => {
    return (
        <Dialog
            open={editFinancialsModalOpen}
            onClose={() => setEditFinancialsModalOpen(false)}
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
                <EditFinancialStatements year={selectedYear} closeModal={() => setEditFinancialsModalOpen(false)} />
            </Box>
        </Dialog>
    )
}

export default FinancialStatementsList