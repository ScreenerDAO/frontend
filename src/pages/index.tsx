// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import React from 'react'
import { setCompanyData } from 'src/features/companyDataSlice'
import FinancialStatements from 'src/layouts/components/FinancialStatements'
import { ICompanyData } from 'src/types/CompanyDataTypes'
import { Card } from '@mui/material'

const companyData: ICompanyData = {
    companyName: 'The coca-cola company',
    ticker: 'KO',
    country: 'US',
    financialStatements: {
        2022: {
            annualReportHash: "fasdfs",
            balanceSheet: {
                TotalAssets: 0,
                TotalCurrentAssets: 0,
                CashAndEquivalents: 0,
                Inventory: 0,
                OtherCurrentAssets: 0,
                TotalNonCurrentAssets: 0,
                PropertyPlantAndEquipment: 0,
                AccumulatedDepreciation: 0,
                LongTermInvestments: 0,
                Goodwill: 0,
                OtherNonCurrentAssets: 0,
                TotalLiabilities: 0,
                TotalCurrentLiabilities: 0,
                AccountsPayable: 0,
                ShortTermDebt: 0,
                OtherCurrentLiabilities: 0,
                TotalNonCurrentLiabilities: 0,
                LongTermDebt: 0,
                CapitalLeases: 0,
                OtherNonCurrentLiabilities: 0,
                TotalEquity: 0,
                CommonStock: 0,
                AdditionalPaidInCapital: 0,
                RetainedEarnings: 0,
                MinorityInterest: 0
            },
            incomeStatement: {
                Revenue: 0,
                CostGoodsSold: 0,
                GrossProfit: 0,
                SellingGeneralAndAdministrativeExpenses: 0,
                DepreciationAndAmortization: 0,
                OtherOperatingExpenses: 0,
                OperatingIncome: 0,
                InterestExpense: 0,
                InterestIncome: 0,
                OtherNonOperatingIncomeExpenses: 0,
                EarningsBeforeTaxes: 0,
                IncomeTaxExpense: 0,
                NetIncome: 0
            },
            cashFlow: null
        },
        2021: {
            annualReportHash: "fsfddsa",
            balanceSheet: {
                TotalAssets: 0,
                TotalCurrentAssets: 0,
                CashAndEquivalents: 0,
                Inventory: 0,
                OtherCurrentAssets: 0,
                TotalNonCurrentAssets: 0,
                PropertyPlantAndEquipment: 0,
                AccumulatedDepreciation: 0,
                LongTermInvestments: 0,
                Goodwill: 0,
                OtherNonCurrentAssets: 0,
                TotalLiabilities: 0,
                TotalCurrentLiabilities: 0,
                AccountsPayable: 0,
                ShortTermDebt: 0,
                OtherCurrentLiabilities: 0,
                TotalNonCurrentLiabilities: 0,
                LongTermDebt: 0,
                CapitalLeases: 0,
                OtherNonCurrentLiabilities: 0,
                TotalEquity: 0,
                CommonStock: 0,
                AdditionalPaidInCapital: 0,
                RetainedEarnings: 0,
                MinorityInterest: 0
            },
            incomeStatement: {
                Revenue: 0,
                CostGoodsSold: 0,
                GrossProfit: 0,
                SellingGeneralAndAdministrativeExpenses: 0,
                DepreciationAndAmortization: 0,
                OtherOperatingExpenses: 0,
                OperatingIncome: 0,
                InterestExpense: 0,
                InterestIncome: 0,
                OtherNonOperatingIncomeExpenses: 0,
                EarningsBeforeTaxes: 0,
                IncomeTaxExpense: 0,
                NetIncome: 0
            },
            cashFlow: null
        },
        2020: {
            annualReportHash: "fdsfsf",
            balanceSheet: {
                TotalAssets: 0,
                TotalCurrentAssets: 0,
                CashAndEquivalents: 0,
                Inventory: 0,
                OtherCurrentAssets: 0,
                TotalNonCurrentAssets: 0,
                PropertyPlantAndEquipment: 0,
                AccumulatedDepreciation: 0,
                LongTermInvestments: 0,
                Goodwill: 0,
                OtherNonCurrentAssets: 0,
                TotalLiabilities: 0,
                TotalCurrentLiabilities: 0,
                AccountsPayable: 0,
                ShortTermDebt: 0,
                OtherCurrentLiabilities: 0,
                TotalNonCurrentLiabilities: 0,
                LongTermDebt: 0,
                CapitalLeases: 0,
                OtherNonCurrentLiabilities: 0,
                TotalEquity: 0,
                CommonStock: 0,
                AdditionalPaidInCapital: 0,
                RetainedEarnings: 0,
                MinorityInterest: 0
            },
            incomeStatement: {
                Revenue: 0,
                CostGoodsSold: 0,
                GrossProfit: 0,
                SellingGeneralAndAdministrativeExpenses: 0,
                DepreciationAndAmortization: 0,
                OtherOperatingExpenses: 0,
                OperatingIncome: 0,
                InterestExpense: 0,
                InterestIncome: 0,
                OtherNonOperatingIncomeExpenses: 0,
                EarningsBeforeTaxes: 0,
                IncomeTaxExpense: 0,
                NetIncome: 0
            },
            cashFlow: null
        }
    }
}

const Dashboard = () => {
    const data = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)    

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(setCompanyData(companyData))
    }, [])

    return (
        <ApexChartWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <h2 style={{marginLeft: '40px'}}>{data.companyName}</h2>
                    </Card>
                </Grid>

                <FinancialStatements companyData={data} />
            </Grid>
        </ApexChartWrapper>
    )
}

// const Dashboard = () => {
//     return (
//         <ApexChartWrapper>
//             <Grid container spacing={6}>
//                 <Grid item xs={12} md={4}>
//                     <Trophy />
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                     <StatisticsCard />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <WeeklyOverview />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <TotalEarning />
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Grid container spacing={6}>
//                         <Grid item xs={6}>
//                             <CardStatisticsVerticalComponent
//                                 stats='$25.6k'
//                                 icon={<Poll />}
//                                 color='success'
//                                 trendNumber='+42%'
//                                 title='Total Profit'
//                                 subtitle='Weekly Profit'
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <CardStatisticsVerticalComponent
//                                 stats='$78'
//                                 title='Refunds'
//                                 trend='negative'
//                                 color='secondary'
//                                 trendNumber='-15%'
//                                 subtitle='Past Month'
//                                 icon={<CurrencyUsd />}
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <CardStatisticsVerticalComponent
//                                 stats='862'
//                                 trend='negative'
//                                 trendNumber='-18%'
//                                 title='New Project'
//                                 subtitle='Yearly Project'
//                                 icon={<BriefcaseVariantOutline />}
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <CardStatisticsVerticalComponent
//                                 stats='15'
//                                 color='warning'
//                                 trend='negative'
//                                 trendNumber='-18%'
//                                 subtitle='Last Week'
//                                 title='Sales Queries'
//                                 icon={<HelpCircleOutline />}
//                             />
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <SalesByCountries />
//                 </Grid>
//                 <Grid item xs={12} md={12} lg={8}>
//                     <DepositWithdraw />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Table />
//                 </Grid>
//             </Grid>
//         </ApexChartWrapper>
//     )
// }

export default Dashboard
