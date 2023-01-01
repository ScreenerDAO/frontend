import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Divider } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";
import { incomeStatementTypesNames } from 'src/types/FinancialStatementsTypes';


const balanceSheetTypesNames: { [key: number]: string } = {
    1: 'Assets',
    2: 'Current assets',
    3: 'Cash and Equivalents',
    4: 'Short term investments',
    5: 'Accounts receivable',
    6: 'Notes receivable',
    7: 'Other receivables',
    8: 'Total receivables',
    9: 'Inventory',
    10: 'Prepaid expenses',
    11: 'Deferred tax assets current',
    12: 'Restricted cash',
    13: 'Other current assets',
    14: 'Total current assets',
    15: 'Non-current assets',
    16: 'Gross property, plant and equipment',
    17: 'Accumulated depreciation',
    18: 'Net property, plant and equipment',
    19: 'Long term investments',
    20: 'Goodwill',
    21: 'Loans receivable',
    22: 'Deferred tax assets non-current',
    23: 'Other non-current assets',
    24: 'Total non-current assets',
    25: 'Total assets',
    26: 'Liabilities',
    27: 'Current liabilities',
    28: 'Accounts payable',
    29: 'Short-term debt',
    30: 'Current income taxes payable',
    31: 'Other current liabilities',
    32: 'Total current liabilities',
    33: 'Non-current liabilities',
    34: 'Long-term debt',
    35: 'Capital lease obligations',
    36: 'Deferred tax liabilities non-current',
    37: 'Other non-current liabilities',
    38: 'Total liabilities',
    39: 'Equity',
    40: 'Common stock',
    41: 'Additional paid-in capital',
    42: 'Retained earnings',
    43: 'Other comprehensive income',
    44: 'Total equity',
    45: 'Total liabilities and equity'
}

const balanceSheetTypes = [
    {
        title: 1,
        elements: [
            {
                title: 2,
                elements: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                total: 14
            },
            {
                title: 15,
                elements: [16, 17, 18, 19, 20, 21, 22, 23],
                total: 24
            }
        ],
        total: 25
    },
    {
        title: 26,
        elements: [
            {
                title: 27,
                elements: [28, 29, 30, 31],
                total: 32
            },
            {
                title: 33,
                elements: [34, 35, 36, 37],
                total: 38
            }
        ],
        total: 38
    },
    {
        title: 39,
        elements: [
            40, 41, 42, 43
        ],
        total: 44
    },
]

interface IProps {
    title: number;
    elements: Array<number | IProps>;
    total: number;
}

const AccordionWrapper = ({ title, elements, total }: IProps) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{balanceSheetTypesNames[title]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {elements.map((element, index) => {
                    if (typeof element === "number") {
                        return (
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{balanceSheetTypesNames[element]}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={'number'}
                                    // startAdornment={
                                    //   <InputAdornment position="start">$</InputAdornment>
                                    // }
                                    label={balanceSheetTypesNames[element]}
                                />
                            </FormControl>
                        );
                    }
                    return <AccordionWrapper key={index} {...element} />;
                })}

                <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                    <TextField
                        variant="outlined"
                        type="number"
                        label={balanceSheetTypesNames[total]}
                        sx={{ marginTop: "10px", marginLeft: "10px" }}
                    />
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

const AccordionWrapperI = ({ title, elements, total }: IProps) => {
    return (
        <Accordion sx={{ width: '300px', marginTop: '10px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{incomeStatementTypesNames[title]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {elements.map((element, index) => {
                    if (typeof element === "number") {
                        return (
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{incomeStatementTypesNames[element]}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={'number'}
                                    // startAdornment={
                                    //   <InputAdornment position="start">$</InputAdornment>
                                    // }
                                    label={incomeStatementTypesNames[element]}
                                />
                            </FormControl>
                        );
                    }
                    return <AccordionWrapper key={index} {...element} />;
                })}

                <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                    <TextField
                        variant="outlined"
                        type="number"
                        label={incomeStatementTypesNames[total]}
                        sx={{ marginTop: "10px", marginLeft: "10px" }}
                    />
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};


const BalanceSheet = () => {
    return (
        <div>
            {balanceSheetTypes.map((item, index) => (
                <AccordionWrapper key={index} {...item} />
            ))}
        </div>
    );
};

const IncomeStatement = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                variant="outlined"
                type="number"
                label="Revenue"
                sx={{ marginTop: "10px", width: '25ch' }}
            />
            <TextField

                variant="outlined"
                type="number"
                label="Cost of Revenue"
                sx={{ marginTop: "10px", width: '25ch' }}
            />

            <Divider />

            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                    variant="outlined"
                    type="number"
                    label="Gross Profit"
                    sx={{ marginTop: "10px", width: '25ch' }}
                />
                <IconButton>
                    <RefreshIcon />
                </IconButton>
            </div>

            <AccordionWrapperI
                {...{ title: 4, elements: [5, 6, 7], total: 8 }}
            />

            <Divider />

            <TextField
                variant="outlined"
                type="number"
                label="Operating Income"
                sx={{ marginTop: "10px", width: '25ch' }}
            />

            <AccordionWrapperI
                {...{ title: 10, elements: [11, 12, 13], total: 14 }}
            />

            <Divider />

            <TextField

                variant="outlined"
                type="number"
                label="Earnings before taxes"
                sx={{ marginTop: "10px", width: '25ch' }}
            />

            <TextField
                variant='outlined'
                type='number'
                label='Income Tax'
                sx={{ marginTop: '10px', width: '25ch' }}
            />

            <TextField

                variant="outlined"
                type="number"
                label="Net Income"
                sx={{ marginTop: "10px", width: '25ch' }}
            />

        </div>
    );
};


// export default BalanceSheet
export default IncomeStatement

