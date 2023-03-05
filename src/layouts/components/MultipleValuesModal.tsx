import React from "react";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormControl, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    Tooltip 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ICompanyData from "src/types/ICompanyData";
import IFinancialStatement from "src/types/IFinancialStatement";
import IStatementElement from "src/types/IStatementElement";
import { StatementType } from "src/types/IStatement";
import { useAppSelector } from "src/hooks";

interface IProps {
    open: boolean;
    closeModal: () => void;
    year: number,
    statementType: StatementType,
    label: number,
    setValue: (element: IStatementElement) => void;
}

const MultipleValuesModal = ({
    open,
    closeModal,
    year,
    statementType,
    label,
    setValue
}: IProps) => {
    const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[year]?.[statementType as keyof IFinancialStatement][label])

    const updateStateAndCloseModal = () => {
        let total = 0

        for (const multipleValuesElement of element?.multipleValues ?? []) {
            const value = Number(multipleValuesElement)

            if (!isNaN(value)) {
                total += value
            }
        }

        const newElementMultipleValues = (element?.multipleValues as string[] ?? []).filter((element: any) => element !== '')

        setValue({
            value: total !== 0 ? parseFloat(total.toFixed(2)).toString() : "",
            multipleValues: newElementMultipleValues.length > 0 ? newElementMultipleValues : null
        })
        closeModal()
    }

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
            <DialogTitle>Add multiple values</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: '5px' }}>
                    <ModalContent element={element} setValue={setValue} />
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={updateStateAndCloseModal}>Add values</Button>
            </DialogActions>
        </Dialog>
    )
}

const ModalContent = ({ element, setValue }: {
    element: IStatementElement,
    setValue: (element: IStatementElement) => void
}) => {
    return (
        <>
            {(element?.multipleValues ?? ['']).map((multipleValuesElement, index) => (
                <FormControl key={index} variant="outlined" sx={{ width: '100%', marginBottom: '10px' }}>
                    <InputLabel>{`Value ${index + 1}`}</InputLabel>
                    <OutlinedInput
                        autoFocus
                        fullWidth
                        type='number'
                        label={`Value ${index + 1}`}
                        endAdornment={
                            <>
                                {(multipleValuesElement ?? "") !== "" ?
                                    <InputAdornment position="end">
                                        <Tooltip title="Clear">
                                            <ClearIcon
                                                onClick={() => {
                                                    const newElementMultipleValues = [...element.multipleValues ?? ['']]
                                                    newElementMultipleValues[index] = ''

                                                    const newElement = { ...element }
                                                    newElement.multipleValues = newElementMultipleValues as any

                                                    setValue(newElement)
                                                }}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        </Tooltip>
                                    </InputAdornment>
                                    :
                                    null
                                }
                            </>
                        }
                        value={multipleValuesElement ?? ''}
                        onChange={ev => {
                            const newElementMultipleValues = [...element?.multipleValues ?? ['']]
                            newElementMultipleValues[index] = ev.target.value

                            const newElement = { ...element }
                            newElement.multipleValues = newElementMultipleValues as any

                            setValue(newElement)
                        }}
                    />
                </ FormControl>
            ))}

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '10px',
                width: '100%'
            }}>
                <Tooltip title="Add another value">
                    <AddIcon
                        sx={{
                            cursor: 'pointer',

                            '&:hover': {
                                color: 'primary.main',  // highlight icon in red on hover
                            },
                        }}
                        onClick={() => {
                            const newElementMultipleValues = [...element?.multipleValues ?? ['']]
                            newElementMultipleValues.push('')

                            const newElement = { ...element }
                            newElement.multipleValues = newElementMultipleValues as any

                            setValue(newElement)
                        }}
                    />
                </Tooltip>
            </div>
        </>
    )
}

export default MultipleValuesModal