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
    43: 'Treasury stock',
    44: 'Other comprehensive income',
    45: 'Total equity',
    46: 'Total liabilities and equity'
}

const balanceSheetStructure = [
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
            40, 41, 42, 43, 44
        ],
        total: 45
    },
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
    13: "Other non-operating income and expenses",
    14: "Total non-operating income and expenses",
    15: "Earnings before taxes",
    16: "Income tax",
    17: "Net income",
    18: "Minority interest",
    19: "Net income to common shareholders"
}
    
export {
    balanceSheetTypesNames,
    balanceSheetStructure,
    incomeStatementTypesNames,
}