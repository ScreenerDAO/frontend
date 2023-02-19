import React from "react";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { ICompanyData, IFinancialStatement, IStatementElement, StatementType } from "src/types/CompanyDataTypes";
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
    // const [numberInputs, setNumberInputs] = React.useState<number>(1)
    // const [values, setValues] = React.useState<{ [key: number]: string }>({
    //     0: ""
    // })
    const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[year]?.[statementType as keyof IFinancialStatement][label])

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
            <DialogTitle>Add multiple values</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: '5px' }}>
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
                                                            let newElementMultipleValues = [...element.multipleValues ?? ['']]
                                                            newElementMultipleValues[index] = ''
                        
                                                            let newElement = {...element}
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
                                    let newElementMultipleValues = [...element?.multipleValues ?? ['']]
                                    newElementMultipleValues[index] = ev.target.value

                                    let newElement = {...element}
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
                                    let newElementMultipleValues = [...element?.multipleValues ?? ['']]
                                    newElementMultipleValues.push('')

                                    let newElement = {...element}
                                    newElement.multipleValues = newElementMultipleValues as any

                                    setValue(newElement)
                                }}
                            />
                        </Tooltip>
                    </div>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={() => {
                    let total = 0
                    // let multipleValues = []

                    // for (let i = 0; i < numberInputs; i++) {
                    //     let value = Number(values[i])

                    //     if (!isNaN(value)) {
                    //         total += value
                    //         multipleValues.push(value)
                    //     }
                    // }

                    for (let multipleValuesElement of element?.multipleValues ?? []) {
                        let value = Number(multipleValuesElement)

                        if (!isNaN(value)) {
                            total += value
                        }
                    }

                    let newElementMultipleValues = (element?.multipleValues as string[] ?? []).filter((element: any) => element !== '')

                    setValue({
                        value: total !== 0 ? parseFloat(total.toFixed(2)).toString() : "",
                        multipleValues: newElementMultipleValues.length > 0 ? newElementMultipleValues : null
                    })
                    closeModal()
                }}>Add values</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MultipleValuesModal