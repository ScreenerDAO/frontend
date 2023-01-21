import React from "react";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
    open: boolean;
    closeModal: () => void;
    setValue: (value: string) => void;
}

const MultipleValuesModal = ({ open, closeModal, setValue }: IProps) => {
    const [numberInputs, setNumberInputs] = React.useState<number>(1)
    const [values, setValues] = React.useState<{ [key: number]: string }>({
        0: ""
    })

    const calculateTotal = () => {
        let total = 0

        for (let i = 0; i < numberInputs; i++) {
            let value = Number(values[i])

            if (!isNaN(value)) {
                total += value
            }
        }

        return parseFloat(total.toFixed(2))
    }

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
            <DialogTitle>Add multiple values</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ paddingTop: '5px' }}>
                    {[...Array(numberInputs).keys()].map((i) => (
                        <FormControl key={i} variant="outlined" sx={{width: '100%', marginBottom: '10px'}}>
                            <InputLabel>{`Value ${i + 1}`}</InputLabel>
                            <OutlinedInput
                                autoFocus
                                fullWidth
                                type='number'
                                label={`Value ${i + 1}`}
                                endAdornment={
                                    <>
                                        {(values[i] ?? "") !== "" ?
                                            <InputAdornment position="end">
                                                <Tooltip title="Clear">
                                                    <ClearIcon
                                                        onClick={() => setValues({
                                                            ...values,
                                                            [i]: ""
                                                        })}
                                                        sx={{ cursor: 'pointer' }}
                                                    />
                                                </Tooltip>
                                            </InputAdornment>
                                            :
                                            null
                                        }
                                    </>
                                }
                                value={values[i] ?? ''}
                                onChange={ev => {
                                    setValues({
                                        ...values,
                                        [i]: ev.target.value
                                    })
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
                                onClick={() => setNumberInputs(numberInputs + 1)}
                            />
                        </Tooltip>
                    </div>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={() => {
                    let total = calculateTotal()

                    setValue(total !== 0 ? total.toString() : "")
                    closeModal()
                }}>Add values</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MultipleValuesModal