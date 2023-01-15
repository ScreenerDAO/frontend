import * as React from 'react'
import BalanceSheet from './BalanceSheet'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IncomeStatement from './IncomeStatement';
import AnnualReports from './AnnualReports';
import Slider from '@mui/material/Slider';
import { ICompanyData, IFinancialStatement, StatementType } from '../../types/CompanyDataTypes';
import { Grid, Card, FormControlLabel, Switch } from '@mui/material';
import { assertNonNullType } from 'graphql';
import { getYearsArray } from '../../helpers/financialStatements'
import MillionsSwitch from './MillionsSwitch';
import Chart from './Chart';
import LogarithmicScaleSwitch from './LogarithmicScale';

const getSelectedYearsArray = (yearsArray: number[], minAndMax: number[]) => {
    let newArray = []

    for (const year of yearsArray) {
        if (year >= minAndMax[0] && year <= minAndMax[1]) {
            newArray.push(year)
        }
    }

    return newArray
}

const getSliderMarks = (yearsArray: number[]): { value: number, label: string }[] => {
    let sliderMarks: { value: number, label: string }[] = []

    for (let year of yearsArray) {
        sliderMarks.push({
            value: year,
            label: year.toString()
        })
    }

    return sliderMarks
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
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

interface IFinancialStatementsProps {
    companyData: ICompanyData
}

const FinancialStatements = (props: IFinancialStatementsProps): React.ReactElement => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [yearsSelected, setYearsSelected] = React.useState<number[]>([]);
    const [selectedLabels, setSelectedLabels] = React.useState<{
        statement: StatementType,
        label: number
    }[]>([])

    const [random, setRandom] = React.useState(0)

    const years = getYearsArray(props.companyData.financialStatements)

    React.useEffect(() => {
        setYearsSelected([years[0], years[years.length - 1]])
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
                        <Card style={{ height: '300px', paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px' }}>
                            <Chart
                                years={years}
                                yearsSelected={yearsSelected}
                                selectedLabels={selectedLabels}
                            />
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
                            />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={2}>
                            Item Three
                        </TabPanel>

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

