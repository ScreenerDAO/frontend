import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { balanceSheetTypesNames, incomeStatementTypesNames } from "src/types/FinancialStatementsTypes";

enum StatementType {
    BalanceSheet,
    IncomeStatement,
    CashFlowStatement
}

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

type EditInputElementProps = {
    autoComplete: boolean;
    label: number;
    statementType: StatementType;
};

const EditInputElement = ({ autoComplete, label, statementType }: EditInputElementProps) => {
    return (
        <FormControl sx={{ marginTop: '10px', marginLeft: 0, width: '100%', flex: 1 }} variant="outlined">
            <InputLabel>{getLabelName(label, statementType)}</InputLabel>
            <OutlinedInput
                type='number'
                label={getLabelName(label, statementType)}
                endAdornment={autoComplete ? (
                    <InputAdornment position="end">
                        <IconButton edge="end">
                            <AutoAwesomeIcon />
                        </IconButton>
                    </InputAdornment>
                ) : null}
            // startAdornment={
            //   <InputAdornment position="start">$</InputAdornment>
            // }
            />
        </FormControl>
    );
}

export {
    StatementType,
    getLabelName
}

export default EditInputElement;
