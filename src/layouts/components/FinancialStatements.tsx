import * as React from 'react'
import BalanceSheet from './BalanceSheet'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IncomeStatement from './IncomeStatement';
import Slider from '@mui/material/Slider';
import { ICompanyData, IFinancialStatement } from '../../types/CompanyDataTypes';
import { Grid, Card } from '@mui/material';

const getYearsArray = (financials: { [key: number]: IFinancialStatement }) => {
    return Object.keys(financials).map(key => Number(key)).sort()
}

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

    const years = getYearsArray(props.companyData.financialStatements)

    const [yearsSelected, setYearsSelected] = React.useState<number[]>([]);

    React.useEffect(() => {
        setYearsSelected([years[0], years[years.length - 1]])
    }, [props.companyData])

    if (years.length > 0) {
        return (
            <>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Slider
                            value={yearsSelected}
                            getAriaLabel={(value: number) => `${value}`}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={getSliderMarks(years)}
                            min={years[0]}
                            max={years[years.length - 1]}
                            onChange={(event: Event, newValue: number | number[]) => setYearsSelected(newValue as number[])}
                            sx={{ width: '80%', marginLeft: '10%' }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent:  'center' }}>
                            <Tabs
                                value={tabIndex}
                                onChange={(event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                                aria-label="basic tabs example"
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                <Tab label="Balance sheet" {...a11yProps(0)} />
                                <Tab label="Income statement" {...a11yProps(1)} />
                                <Tab label="Cash flow statement" {...a11yProps(2)} />
                            </Tabs>
                        </Box >

                        <TabPanel value={tabIndex} index={0}>
                            <BalanceSheet data={props.companyData} yearsSelected={getSelectedYearsArray(years.reverse(), yearsSelected)} />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                            <IncomeStatement data={props.companyData} yearsArray={getSelectedYearsArray(years.reverse(), yearsSelected)} />
                        </TabPanel>

                        <TabPanel value={tabIndex} index={2}>
                            Item Three
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
                <div style={{textAlign: 'center'}}>This company doesn't have any financials added yet!</div>
            </Card>
        </Grid>
    )
}

export default FinancialStatements

