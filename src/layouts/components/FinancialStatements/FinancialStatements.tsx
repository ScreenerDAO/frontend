import * as React from 'react'
import BalanceSheet from './BalanceSheet'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IncomeStatement from './IncomeStatement';
import AnnualReports from '../AnnualReports';
import Slider from '@mui/material/Slider';
import ICompanyData from 'src/types/ICompanyData';
import { StatementType } from 'src/types/IStatement';
import { Grid, Card, FormControl, MenuItem, Select, IconButton, Typography, Paper } from '@mui/material';
import { getYearsArray } from '../../../lib/financialStatements'
import MillionsSwitch from '../MillionsSwitch';
import Chart, { getLabel } from '../Chart';
import LogarithmicScaleSwitch from '../LogarithmicScaleSwitch';
import CloseIcon from '@mui/icons-material/Close';
import Ratios from '../Ratios';

const getSelectedYearsArray = (yearsArray: number[], minAndMax: number[]) => {
    const newArray = []

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

    // const [excludedLabels, setExcludedLabels] = React.useState<{[key: string]: number[]}>({
    //     "balanceSheet": [],
    //     "incomeStatement": [],
    //     "cashFlow": []
    // })

    const years = getYearsArray(props.companyData.financialStatements)

    React.useEffect(() => {
        setYearsSelected([years[0], years[years.length - 1]])

        // let bsExcludedLabels = []
        // let isExcludedLabels = []

        // parentLoop:
        // for (const label of Object.keys(balanceSheetTypesNames)) {
        //     for (const year of years) {
        //         if (Number(props.companyData.financialStatements[year].balanceSheet[Number(label)].value)) {
        //             continue parentLoop
        //         } 
        //     }

        //     bsExcludedLabels.push(Number(label))
        // }

        // parentLoop:
        // for (const label of Object.keys(incomeStatementTypesNames)) {
        //     for (const year of years) {
        //         if (Number(props.companyData.financialStatements[year].incomeStatement[Number(label)].value)) {
        //             continue parentLoop
        //         } 
        //     }

        //     isExcludedLabels.push(Number(label))
        // }

        // setExcludedLabels({
        //     "balanceSheet": bsExcludedLabels,
        //     "incomeStatement": isExcludedLabels,
        // })
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

                {tabIndex >= 0 && tabIndex <= 3 && selectedLabels.length > 0 ?
                    <Grid item xs={12} md={12}>
                        <Card style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>

                            <div style={{ height: '300px' }}>
                                <Chart
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
                                                                    const newLabels = [...selectedLabels]
                                                                    newLabels[index].type = ev.target.value as string
                                                                    setSelectedLabels(newLabels)
                                                                }}
                                                            >
                                                                <MenuItem value={'bar'}>Bar</MenuItem>
                                                                <MenuItem value={'line'}>Line</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <IconButton onClick={() => {
                                                            const newLabels = [...selectedLabels]
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
                                <Tab label="Ratios" {...a11yProps(3)} />
                                <Tab label="Annual reports" {...a11yProps(4)} />
                            </Tabs>
                        </Box >

                        <TabPanel value={tabIndex} index={0}>
                            <BalanceSheet
                                data={props.companyData}
                                yearsSelected={getSelectedYearsArray(years, yearsSelected)}
                                selectedLabels={selectedLabels}
                                setSelectedLabels={labels => {
                                    setSelectedLabels(labels)
                                }}

                                // excludedLabels={excludedLabels["balanceSheet"]}
                            />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                            <IncomeStatement
                                data={props.companyData}
                                yearsArray={getSelectedYearsArray(years, yearsSelected)}
                                selectedLabels={selectedLabels}
                                setSelectedLabels={labels => {
                                    setSelectedLabels(labels)
                                }}

                                // excludedLabels={excludedLabels["incomeStatement"]}
                            />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={2}></TabPanel>

                        <TabPanel value={tabIndex} index={3}>
                            <Ratios yearsSelected={getSelectedYearsArray(years, yearsSelected)} />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={4}>
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
