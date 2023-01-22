enum AutofillOperation {
    Add,
    Subtract
}

const balanceSheetTypesNames: { [key: number]: string } = {
    1: 'Assets',
    2: 'Current assets',
    3: 'Cash and Equivalents',
    4: 'Short term investments',
    5: 'Receivables',
    6: 'Accounts receivable',
    7: 'Notes receivable',
    8: 'Other receivables',
    9: 'Total receivables',
    10: 'Inventory',
    11: 'Prepaid expenses',
    12: 'Deferred tax assets current',
    13: 'Restricted cash',
    14: 'Other current assets',
    15: 'Total current assets',
    16: 'Non-current assets',
    17: 'Property, plant and equipment',
    18: 'Gross property, plant and equipment',
    19: 'Accumulated depreciation',
    20: 'Net property, plant and equipment',
    21: 'Long term investments',
    22: 'Goodwill',
    23: 'Other intangible assets',
    24: 'Loans receivable',
    25: 'Deferred tax assets non-current',
    26: 'Other non-current assets',
    27: 'Total non-current assets',
    28: 'Total assets',
    29: 'Liabilities',
    30: 'Current liabilities',
    31: 'Accounts payable',
    32: 'Short-term debt',
    33: 'Current maturities of long term debt',
    34: 'Current income taxes payable',
    35: 'Other current liabilities',
    36: 'Total current liabilities',
    37: 'Non-current liabilities',
    38: 'Long-term debt',
    39: 'Capital lease obligations',
    40: 'Deferred tax liabilities non-current',
    41: 'Other non-current liabilities',
    42: 'Total non-current liabilities',
    43: 'Total liabilities',
    44: 'Equity',
    45: 'Common stock',
    46: 'Additional paid-in capital',
    47: 'Retained earnings',
    48: 'Treasury stock',
    49: 'Comprehensive income and other (loss)',
    50: 'Minority interest',
    51: 'Total equity',
    52: 'Total liabilities and equity',
    53: 'Preferred stock',
    54: 'Other equity',
    55: 'Accrued liabilities'
}

interface IElement {
    label: number;
    operation: AutofillOperation;
}

interface IElementsGroup {
    title: number;
    total: IElement;
    elements: Array<IElement | IElementsGroup>;
}

const balanceSheetStructure: IElementsGroup[] = [
    {
        title: 1,
        elements: [
            {
                title: 2,
                elements: [
                    { label: 3, operation: AutofillOperation.Add }, 
                    { label: 4, operation: AutofillOperation.Add },
                    {
                        title: 5,
                        elements: [
                            { label: 6, operation: AutofillOperation.Add }, 
                            { label: 7, operation: AutofillOperation.Add }, 
                            { label: 8, operation: AutofillOperation.Add }
                        ],
                        total: { label: 9, operation: AutofillOperation.Add }
                    },
                    { label: 10, operation: AutofillOperation.Add }, 
                    { label: 11, operation: AutofillOperation.Add }, 
                    { label: 12, operation: AutofillOperation.Add }, 
                    { label: 13, operation: AutofillOperation.Add }, 
                    { label: 14, operation: AutofillOperation.Add }
                ],
                total: { label: 15, operation: AutofillOperation.Add }
            },
            {
                title: 16,
                elements: [ 
                    {
                        title: 17,
                        elements: [
                            { label: 18, operation: AutofillOperation.Add }, 
                            { label: 19, operation: AutofillOperation.Subtract }
                        ],
                        total: { label: 20, operation: AutofillOperation.Add }
                    },
                    { label: 21, operation: AutofillOperation.Add }, 
                    { label: 22, operation: AutofillOperation.Add }, 
                    { label: 23, operation: AutofillOperation.Add }, 
                    { label: 24, operation: AutofillOperation.Add }, 
                    { label: 25, operation: AutofillOperation.Add }, 
                    { label: 26, operation: AutofillOperation.Add }
                ],
                total: { label: 27, operation: AutofillOperation.Add }
            }
        ],
        total: { label: 28, operation: AutofillOperation.Add }
    },
    {
        title: 29,
        elements: [
            {
                title: 30,
                elements: [
                    { label: 31, operation: AutofillOperation.Add }, 
                    { label: 32, operation: AutofillOperation.Add }, 
                    { label: 33, operation: AutofillOperation.Add }, 
                    { label: 34, operation: AutofillOperation.Add }, 
                    { label: 55, operation: AutofillOperation.Add },
                    { label: 35, operation: AutofillOperation.Add }
                ],
                total: { label: 36, operation: AutofillOperation.Add }
            },
            {
                title: 37,
                elements: [
                    { label: 38, operation: AutofillOperation.Add }, 
                    { label: 39, operation: AutofillOperation.Add }, 
                    { label: 40, operation: AutofillOperation.Add }, 
                    { label: 41, operation: AutofillOperation.Add }
                ],
                total: { label: 42, operation: AutofillOperation.Add }
            }
        ],
        total: { label: 43, operation: AutofillOperation.Add }
    },
    {
        title: 44,
        elements: [
            { label: 45, operation: AutofillOperation.Add }, 
            { label: 53, operation: AutofillOperation.Add },
            { label: 46, operation: AutofillOperation.Add }, 
            { label: 47, operation: AutofillOperation.Add }, 
            { label: 48, operation: AutofillOperation.Subtract }, 
            { label: 49, operation: AutofillOperation.Add }, 
            { label: 50, operation: AutofillOperation.Add },
            { label: 54, operation: AutofillOperation.Add}
        ],
        total: { label: 51, operation: AutofillOperation.Add }
    }
]

const incomeStatementTypesNames: { [key: number]: string } = {
    1: "Revenue",
    2: "Cost of revenue",
    3: "Gross profit",
    4: "Operating expenses",
    5: "Research and development",
    6: "Selling, general and administrative",
    7: "Other operating expenses",
    8: "Total operating expenses",
    9: "Operating income",
    10: "Non-operating income and expenses",
    11: "Interest income",
    12: "Interest expense",
    13: "Equity income (loss)",
    14: "Currency exchange gain (loss)",
    15: "Other non-operating income (loss)",
    16: "Total non-operating income and expenses",
    17: "Earnings before taxes",
    18: "Income tax",
    19: "Net income",
    20: "Minority interest",
    21: "Net income to common shareholders",
    22: "Depreciation and amortization"
}

const cashFlowStatementTypes: { [key: number]: string } = {
    1: "Operating cash flow",
    2: "Net income",
    3: "Depreciation and amortization",
    4: "Deferred income tax",
    5: "Stock based compensation",
}

const currencies: { [key: number]: {
    code: string
    name: string
}} = {
    1: {code: "USD", name: "United states dollar"}
}

const countries: { [key: number]: {
    name: string
}} = {
    1: {name: "United States"},
    2: {name: "Spain"}
}

export {
    balanceSheetTypesNames,
    balanceSheetStructure,
    incomeStatementTypesNames,
    AutofillOperation,
    currencies,
    countries
}

export type {
    IElement,
    IElementsGroup
}