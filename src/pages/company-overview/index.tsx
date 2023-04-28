import React from 'react';
import { Card, CircularProgress, Grid, IconButton, MenuItem } from '@mui/material';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import FinancialStatements from 'src/layouts/components/FinancialStatements/FinancialStatements';
import SearchBar from 'src/layouts/components/SearchBar';
import { useAppSelector } from 'src/hooks';
import ICompanyData from 'src/types/ICompanyData';
import { IGeneral } from 'src/features/general';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { useRouter } from 'next/router'
import PageWrapper from 'src/layouts/components/PageWrapper';
import { IGetStaticPropsResult } from '../../lib/getStaticProps';
import { getStaticProps } from '../../lib/getStaticProps';
import { getWikipediaSummary } from 'src/lib/generalMethods';
import CompanyHeader2 from 'src/layouts/components/CompanyHeader2';
import CompanyHeader from 'src/layouts/components/CompanyHeader';
import CompanyHeader3 from 'src/layouts/components/CompanyHeader3';
import { SymbolInfo } from 'react-ts-tradingview-widgets';

const Dashboard = ({ companies }: IGetStaticPropsResult) => {
    const data = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)
    const [wikipediaSumary, setWikipediaSumary] = React.useState<string>("")

    React.useEffect(() => {
        if (data.wikipediaPage) {
            getWikipediaSummary(data.wikipediaPage)
                .then(res => setWikipediaSumary(res.extract))
        }
    }, [data])

    return (
        <PageWrapper companies={companies}>
            <ApexChartWrapper>
                {companyLoading || data.id === null ?
                    <div style={{
                        height: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CircularProgress />
                    </div>
                    :
                    <CompanyDashboard data={data} wikipediaSumary={wikipediaSumary} />
                }
            </ApexChartWrapper>
        </PageWrapper>
    )
}

const CompanyDashboard = ({ data, wikipediaSumary }: { data: ICompanyData, wikipediaSumary: string }) => {
    return (
        <Grid container spacing={3}>
            <Grid
                item
                xs={12}
                md={12}
                sx={{ display: { xs: 'block', md: 'none' }, marginBottom: '10px' }}
            >
                <SearchBar />
            </Grid>

            <Grid item xs={12}>
                {/* <Card sx={{ display: 'flex', alignItems: 'center', paddingRight: '5px' }}>
                    <h2 style={{ marginLeft: '40px', flex: 1 }}>#{data.id} {data.companyName} ({data.ticker})</h2>
                    <CompanyMoreOptions data={data} />
                </Card> */}
                <Card>
                    <SymbolInfo symbol={data.ticker} isTransparent={true} autosize></SymbolInfo>
                </Card>
            </Grid>

            <FinancialStatements companyData={data} wikipediaSumary={wikipediaSumary} />
        </Grid>
    );
};

const CompanyMoreOptions = ({ data }: {
    data: ICompanyData
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon fontSize={'large'} />
            </IconButton>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    router.push(`/edit-records?id=${data.id}`)
                    handleClose()
                }} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>

                {/* <Divider sx={{ my: 0.5 }} /> */}
                <MenuItem onClick={() => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(
                        new Blob([JSON.stringify(data)], { type: 'application/json' })
                    )
                    a.download = `${data.companyName}.json`;
                    a.click()

                    handleClose()
                }} disableRipple>
                    <ArchiveIcon />
                    Download JSON
                </MenuItem>
                {/* <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                </MenuItem> */}
            </StyledMenu>
        </>
    )
}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export { getStaticProps }

export default Dashboard
