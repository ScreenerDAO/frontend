import * as React from 'react'
import BalanceSheet from './BalanceSheet'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IncomeStatement from './IncomeStatement';
import AnnualReports from '../AnnualReports';
import Slider from '@mui/material/Slider';
import ICompanyData from '@/lib/types/ICompanyData';
import { StatementType } from '@/lib/types/IStatement';
import { Grid, Card, FormControl, MenuItem, Select, IconButton, Typography, Paper } from '@mui/material';
import { getYearsArray } from '@/lib/methods/financialStatements'
import MillionsSwitch from '../MillionsSwitch';
import Chart, { getLabel } from '../Chart';
import LogarithmicScaleSwitch from '../LogarithmicScaleSwitch';
import CloseIcon from '@mui/icons-material/Close';
import Ratios from '../Ratios';
import CashFlowStatement from './CashFlowStatement';
import StockPriceChart from '../StockPriceChart';
import { CompanyProfile, FundamentalData } from 'react-ts-tradingview-widgets';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';

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
                <Box>
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

const FinancialStatements = (props: { companyData: ICompanyData, wikipediaSumary: string }): React.ReactElement => {
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


    // if (years.length > 0) {
    return (
        <>
            <Grid item xs={12}>
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
                            <Tab icon={<BusinessIcon />} label="OVERVIEW" {...a11yProps(0)} />
                            <Tab icon={<AccountBalanceIcon />} label="FINANCIALS" {...a11yProps(1)} />
                            <Tab icon={<DescriptionIcon />} label="ANNUAL REPORTS" {...a11yProps(2)} />
                        </Tabs>
                    </Box >
                </Card>
            </Grid>

            <Grid item xs={12}>
                <TabPanel value={tabIndex} index={0}>
                    <Grid container spacing={3}>
                        {!props.companyData.isDelisted ?
                            <Grid item xs={12}>
                                <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                                    <StockPriceChart companyTicker={props.companyData.ticker} />
                                </Paper>
                            </Grid>
                            : null
                        }

                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ padding: '20px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <div>Country</div>
                                        <b>{props.companyData.country}</b>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div>Currency</div>
                                        <b>{props.companyData.currency ?? 'N/A'}</b>
                                    </Grid>

                                    {!props.companyData.isDelisted ?
                                        <Grid item xs={6}>
                                            <div>ISIN</div>
                                            <b>{props.companyData.isin ?? 'N/A'}</b>
                                        </Grid>
                                        : null
                                    }
                                </Grid>
                            </Paper>

                            {!props.companyData.isDelisted ?
                                <Paper sx={{ marginTop: '0.75rem' }}>
                                    <FundamentalData symbol={props.companyData.ticker} height={800} width='100%' isTransparent></FundamentalData>
                                </Paper>
                                : null
                            }
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {props.companyData.isDelisted ?
                                <WikipediaSummary summary={props.wikipediaSumary} wikipediaPage={props.companyData.wikipediaPage as string} />
                                :
                                <Paper>
                                    <CompanyProfile symbol={props.companyData.ticker} height="550" width="100%" isTransparent></CompanyProfile>
                                </Paper>
                            }
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    {years.length > 0 ?
                        <FinancialsTab
                            years={years}
                            companyData={props.companyData}
                            yearsSelected={yearsSelected}
                            selectedLabels={selectedLabels}
                            setSelectedLabels={setSelectedLabels}
                            setYearsSelected={setYearsSelected}
                        />
                        :
                        <Grid item xs={12} md={12}>
                            <Card sx={{
                                height: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <div style={{ textAlign: 'center' }}>This company doesn&apos;t have any financials added yet!</div>
                            </Card>
                        </Grid>
                    }
                </TabPanel>

                <TabPanel value={tabIndex} index={2}>
                    <AnnualReports data={props.companyData} />
                </TabPanel>
            </Grid>
        </>
    )
}

const FinancialsTab = ({ companyData, selectedLabels, yearsSelected, years, setSelectedLabels, setYearsSelected }: {
    companyData: ICompanyData,
    selectedLabels: IChartLabel[],
    yearsSelected: number[],
    years: number[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<IChartLabel[]>>,
    setYearsSelected: React.Dispatch<React.SetStateAction<number[]>>
}) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* {selectedLabels.length > 0 ? */}
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
                {/* : null} */}
            </Grid>

            <Grid item xs={12}>
                {/* {selectedLabels.length > 0 ? */}
                <Card style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }}>

                    <div style={{ height: '300px' }}>
                        <Chart
                            years={years}
                            yearsSelected={yearsSelected}
                            selectedLabels={selectedLabels}
                        />
                    </div>

                    <Grid item xs={12} style={{ marginTop: '25px' }}>
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
                {/* : null} */}
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Financials
                        years={years}
                        companyData={companyData}
                        yearsSelected={yearsSelected}
                        selectedLabels={selectedLabels}
                        setSelectedLabels={setSelectedLabels}
                        setYearsSelected={setYearsSelected}
                    />
                </Card>
            </Grid>
        </Grid>
    )
}

const Financials = ({ companyData, selectedLabels, yearsSelected, years, setSelectedLabels, setYearsSelected }: {
    companyData: ICompanyData,
    selectedLabels: IChartLabel[],
    yearsSelected: number[],
    years: number[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<IChartLabel[]>>,
    setYearsSelected: React.Dispatch<React.SetStateAction<number[]>>
}) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <>
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
                </Tabs>
            </Box >

            <Card>
                <TabPanel value={tabIndex} index={0}>
                    <BalanceSheet
                        data={companyData}
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
                        data={companyData}
                        yearsSelected={getSelectedYearsArray(years, yearsSelected)}
                        selectedLabels={selectedLabels}
                        setSelectedLabels={labels => {
                            setSelectedLabels(labels)
                        }}

                    // excludedLabels={excludedLabels["incomeStatement"]}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={2}>
                    <CashFlowStatement
                        data={companyData}
                        yearsSelected={getSelectedYearsArray(years, yearsSelected)}
                        selectedLabels={selectedLabels}
                        setSelectedLabels={labels => {
                            setSelectedLabels(labels)
                        }}

                    // excludedLabels={excludedLabels["cashFlow"]}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={3}>
                    <Ratios yearsSelected={getSelectedYearsArray(years, yearsSelected)} />
                </TabPanel>
            </Card>
        </>
    )
}

const WikipediaSummary = ({ summary, wikipediaPage }: {
    summary: string,
    wikipediaPage: string
}) => {

    return (
        <Paper variant="outlined" sx={{ padding: '20px' }}>
            {summary}

            <a
                href={`https://en.wikipedia.org/wiki/${wikipediaPage}`}
                title='Wikipedia'
                target='_blank'
                style={{ color: '#1A0DAB', textDecoration: 'none' }}
            >Wikipedia</a>
        </Paper>
    )
}

export default FinancialStatements

export type {
    IChartLabel
}

