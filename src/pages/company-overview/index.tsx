import React from 'react';
import { Button, Card, CircularProgress, Divider, Grid, IconButton, MenuItem } from '@mui/material';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import FinancialStatements from 'src/layouts/components/FinancialStatements';
import SearchBar from 'src/layouts/components/SearchBar';
import { useAppSelector } from 'src/hooks';
import { ICompanyData } from 'src/types/CompanyDataTypes';
import { IGeneral } from 'src/features/general';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { useRouter } from 'next/router'

const Dashboard = () => {
    const data = useAppSelector((state: { companyData: ICompanyData }) => state.companyData)
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    return (
        <ApexChartWrapper>
            {/* {data.companyName == "" && data.ticker == "" ?
                <EmptyCompanyDashboard />
                :
                <CompanyDashboard data={data} />
            } */}
            {companyLoading ?
                <div style={{
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}><CircularProgress /></div>
                :
                <CompanyDashboard data={data} />

            }
        </ApexChartWrapper>
    )
}

const CompanyDashboard = ({ data }: { data: ICompanyData }) => {
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
            <Grid item xs={12} md={12}>
                <Card sx={{ display: 'flex', alignItems: 'center', paddingRight: '5px' }}>
                    <h2 style={{ marginLeft: '40px', flex: 1 }}>#{data.id} {data.companyName} ({data.ticker})</h2>
                    <CompanyMoreOptions data={data} />
                </Card>
            </Grid>
            <FinancialStatements companyData={data} />
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
                    router.push('/edit-records')
                    handleClose()
                }} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    let a = document.createElement('a');
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
                <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                </MenuItem>
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


const EmptyCompanyDashboard = () => {
    const companyLoading = useAppSelector((state: { general: IGeneral }) => state.general.companyLoading)

    if (companyLoading) {
        return (
            <div style={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}><CircularProgress /></div>
        )
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} sx={{ display: { xs: 'block', md: 'none' }, marginBottom: '10px' }}>
                    <SearchBar />
                </Grid>

                <Grid item xs={12} md={12}>
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>Select a company to dispay it's financials</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
