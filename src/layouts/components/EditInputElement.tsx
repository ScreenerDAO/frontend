import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Tooltip } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { AutofillOperation, IElement, balanceSheetTypesNames, incomeStatementTypesNames } from "src/types/FinancialStatementsTypes";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { ICompanyData, IFinancialStatement, IStatement, StatementType } from "src/types/CompanyDataTypes";
import { setStatementElement } from 'src/features/newCompanyDataSlice'
import ClearIcon from '@mui/icons-material/Clear';
import { useStore } from "react-redux";
import { RootState } from "src/store";
import FunctionsIcon from '@mui/icons-material/Functions';
import MultipleValuesModal from "./MultipleValuesModal";
import React from "react";
import Operation from "antd/es/transfer/operation";
import { auto } from "@popperjs/core";

const getLabelName = (label: number, financialType: StatementType) => {
    switch (financialType) {
        case StatementType.BalanceSheet:
            return balanceSheetTypesNames[label];
        case StatementType.IncomeStatement:
            return incomeStatementTypesNames[label];
        case StatementType.CashFlowStatement:
            return ""
    }
}

const getValue = (value: string, valuesAsThousands: boolean) => {
    let number = Number(value)

    if (isNaN(number) || number === 0) {
        return ""
    }

    if (valuesAsThousands) {
        return (number / 1000000).toString()
    }

    return number.toString()
}

const getAutofillValue = (elements: IElement[], statementValues: IStatement) => {
    let total = 0

    for (let element of (elements ?? [])) {
        let number = Number(statementValues[element.label])

        if (!isNaN(number)) {
            if (element.operation === AutofillOperation.Add) {
                total += number
            }

            if (element.operation === AutofillOperation.Subtract) {
                total -= number
            }
        }
    }

    return total === 0 ? "" : parseFloat(total.toFixed(2)).toString()
}

const setValueFormatter = (value: string, valuesAsThousands: boolean) => {
    if (valuesAsThousands) {
        let number = Number(value)

        if (isNaN(number) || number === 0) {
            return ""
        }

        return (number * 1000000).toString()
    }

    return value
}

type EditInputElementProps = {
    label: number;
    statementType: StatementType;
    year: number
    valuesAsThousands: boolean
    autofillElements?: IElement[]
};

const EditInputElement = ({
    label,
    statementType,
    year,
    valuesAsThousands,
    autofillElements
}: EditInputElementProps) => {
    const store = useStore<RootState>()
    const dispatch = useAppDispatch()
    const element = useAppSelector((state: { newCompanyData: ICompanyData }) => state.newCompanyData.financialStatements[year][statementType as keyof IFinancialStatement][label])
    const [openMultipleValuesModal, setOpenMultipleValuesModal] = React.useState(false)

    const setElement = (value: string) => {
        dispatch(setStatementElement({
            year: year,
            statement: statementType,
            element: label,
            value: value
        }))
    }

    return (
        <>
            <FormControl sx={{ marginTop: '10px', marginLeft: 0, width: '100%', flex: 1 }} variant="outlined">
                <InputLabel>{getLabelName(label, statementType)}</InputLabel>
                <OutlinedInput
                    type='number'
                    label={getLabelName(label, statementType)}
                    endAdornment={
                        <InputAdornment position="end">
                            {(element ?? "") !== "" ?
                                <InputAdornment position="end">
                                    <Tooltip title="Clear">
                                        <ClearIcon
                                            onClick={() => setElement("")}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                </InputAdornment>
                                :
                                null
                            }

                            <InputAdornment position="end">
                                <Tooltip title="Add multiple values">
                                    <FunctionsIcon
                                        onClick={() => {
                                            setOpenMultipleValuesModal(true)
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </Tooltip>
                            </InputAdornment>

                            {autofillElements ?
                                <InputAdornment position="end">
                                    <Tooltip title="Autofill">
                                        <AutoAwesomeIcon sx={{ cursor: 'pointer' }} onClick={() => {
                                            setElement(getAutofillValue(autofillElements, store.getState().newCompanyData.financialStatements[year][statementType as keyof IFinancialStatement]))
                                        }} />
                                    </Tooltip>
                                </ InputAdornment>
                                :
                                null
                            }
                        </InputAdornment>
                    }
                    value={getValue(element, valuesAsThousands)}
                    onChange={(e) => setElement(setValueFormatter(e.target.value, valuesAsThousands))}
                // startAdornment={
                //   <InputAdornment position="start">$</InputAdornment>
                // }
                />
            </FormControl>

            <MultipleValuesModal
                open={openMultipleValuesModal}
                closeModal={() => setOpenMultipleValuesModal(false)}
                setValue={(value: string) => setElement(setValueFormatter(value, valuesAsThousands))}
            />
        </>
    );
}

export {
    StatementType,
    getLabelName,
}

export default EditInputElement;
