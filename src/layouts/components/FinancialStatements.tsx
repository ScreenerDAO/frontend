import * as React from 'react'
import BalanceSheet from './BalanceSheet'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IncomeStatement from './IncomeStatement';
import AnnualReports from './AnnualReports';
import Slider from '@mui/material/Slider';
import { ICompanyData, IFinancialStatement, StatementType } from '../../types/CompanyDataTypes';
import { Grid, Card, FormControlLabel, Switch, FormControl, InputLabel, MenuItem, Select, IconButton, Typography, Paper } from '@mui/material';
import { assertNonNullType } from 'graphql';
import { getYearsArray } from '../../helpers/financialStatements'
import MillionsSwitch from './MillionsSwitch';
import Chart, { getLabel } from './Chart';
import Chart2 from './Chart2';
import LogarithmicScaleSwitch from './LogarithmicScale';
import CloseIcon from '@mui/icons-material/Close';
import { balanceSheetTypesNames, incomeStatementTypesNames } from 'src/types/FinancialStatementsTypes';

const getSelectedYearsArray = (yearsArray: number[], minAndMax: number[]) => {
    let newArray = []

    for (const year of yearsArray) {
        if (year >= minAndMax[0] && year <= minAndMax[1]) {
            newArray.push(year)
        }
    }

    return newArray
}

const TabPanel = (props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface IChartLabel {
    statement: StatementType,
    label: number
    type: string
}

const FinancialStatements = (props: { companyData: ICompanyData }): React.ReactElement => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [yearsSelected, setYearsSelected] = React.useState<number[]>([]);
    const [selectedLabels, setSelectedLabels] = React.useState<IChartLabel[]>([
        {
            label: 1,
            statement: StatementType.IncomeStatement,
            type: "bar"
        },
        {
            label: 19,
            statement: StatementType.IncomeStatement,
            type: "bar"
        }
    ])
    const [excludedLabels, setExcludedLabels] = React.useState<{[key: string]: number[]}>({
        "balanceSheet": [],
        "incomeStatement": [],
        "cashFlow": []
    })

    const [_, setRandom] = React.useState(0)

    const years = getYearsArray(props.companyData.financialStatements)

    React.useEffect(() => {
        setYearsSelected([years[0], years[years.length - 1]])

        let bsExcludedLabels = []
        let isExcludedLabels = []

        parentLoop:
        for (const label of Object.keys(balanceSheetTypesNames)) {
            for (const year of years) {
                if (Number(props.companyData.financialStatements[year].balanceSheet[Number(label)])) {
                    continue parentLoop
                } 
            }

            bsExcludedLabels.push(Number(label))
        }

        parentLoop:
        for (const label of Object.keys(incomeStatementTypesNames)) {
            for (const year of years) {
                if (Number(props.companyData.financialStatements[year].incomeStatement[Number(label)])) {
                    continue parentLoop
                } 
            }

            isExcludedLabels.push(Number(label))
        }

        setExcludedLabels({
            "balanceSheet": bsExcludedLabels,
            "incomeStatement": isExcludedLabels,
        })
    }, [props.companyData])


    if (years.length > 0) {
        return (
            <>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Box sx={{ marginLeft: '5%', paddingTop: '10px', paddingBottom: '10px' }}>
                            <MillionsSwitch />
                            <LogarithmicScaleSwitch />
                        </Box>

                        <Slider
                            value={yearsSelected}
                            getAriaLabel={(value: number) => `${value}`}
                            step={1}
                            valueLabelDisplay="auto"
                            marks
                            min={years[0]}
                            max={years[years.length - 1]}
                            onChange={(event: Event, newValue: number | number[]) => setYearsSelected(newValue as number[])}
                            sx={{ width: '90%', marginLeft: '5%' }}
                        />
                    </Card>
                </Grid>

                {(tabIndex === 0 || tabIndex === 1 || tabIndex === 2) && selectedLabels.length > 0 ?
                    <Grid item xs={12} md={12}>
                        <Card style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>

                            <div style={{ height: '300px' }}>
                                <Chart2
                                    years={years}
                                    yearsSelected={yearsSelected}
                                    selectedLabels={selectedLabels}
                                />
                            </div>

                            <Grid item xs={12} md={12} style={{ marginTop: '25px' }}>
                                <Grid container spacing={2}>
                                    {selectedLabels.map((label, index) => (
                                        <Grid item xs={12} md={6} lg={4} key={index}>
                                            <Paper sx={{ padding: '10px', height: '60px' }}>
                                                <Grid container>
                                                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Typography fontSize={16}>{getLabel(label)}</Typography>
                                                    </Grid>

                                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <FormControl size="small">
                                                            <Select
                                                                value={label.type}
                                                                sx={{ width: '90px' }}
                                                                onChange={ev => {
                                                                    let newLabels = [...selectedLabels]
                                                                    newLabels[index].type = ev.target.value as string
                                                                    setSelectedLabels(newLabels)
                                                                    setRandom(Math.random())
                                                                }}
                                                            >
                                                                <MenuItem value={'bar'}>Bar</MenuItem>
                                                                <MenuItem value={'line'}>Line</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <IconButton onClick={() => {
                                                            let newLabels = [...selectedLabels]
                                                            newLabels.splice(index, 1)
                                                            setSelectedLabels(newLabels)
                                                        }}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid> : null
                }

                <Grid item xs={12} md={12}>
                    <Card>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                            <Tabs
                                value={tabIndex}
                                onChange={(event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                                aria-label="basic tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                            >
                                <Tab label="Balance sheet" {...a11yProps(0)} />
                                <Tab label="Income statement" {...a11yProps(1)} />
                                <Tab label="Cash flow" {...a11yProps(2)} />
                                <Tab label="Annual reports" {...a11yProps(3)} />
                            </Tabs>
                        </Box >

                        <TabPanel value={tabIndex} index={0}>
                            <BalanceSheet
                                data={props.companyData}
                                yearsSelected={getSelectedYearsArray(years, yearsSelected)}
                                selectedLabels={selectedLabels}
                                setSelectedLabels={labels => {
                                    setSelectedLabels(labels)
                                    setRandom(Math.random())
                                }}
                                excludedLabels={excludedLabels["balanceSheet"]}
                            />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                            <IncomeStatement
                                data={props.companyData}
                                yearsArray={getSelectedYearsArray(years, yearsSelected)}
                                selectedLabels={selectedLabels}
                                setSelectedLabels={labels => {
                                    setSelectedLabels(labels)
                                    setRandom(Math.random())
                                }}
                                excludedLabels={excludedLabels["incomeStatement"]}
                            />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={2}>Item Three</TabPanel>

                        <TabPanel value={tabIndex} index={3}>
                            <AnnualReports data={props.companyData} />
                        </TabPanel>
                    </Card>
                </Grid>
            </>
        )
    }

    return (
        <Grid item xs={12} md={12}>
            <Card sx={{
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>This company doesn't have any financials added yet!</div>
            </Card>
        </Grid>
    )
}

export default FinancialStatements

export type {
    IChartLabel
}

