import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import { Settings } from 'src/@core/context/settingsContext'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import SearchBar from '../SearchBar'
import { BriefcasePlusOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useAppDispatch } from 'src/hooks'
import { setCompanyData, initialState } from 'src/features/companyDataSlice'
import { setCompanyData as setNewCompanyData, initialState as newCompanyInitialState } from 'src/features/newCompanyDataSlice'
import Tooltip from '@mui/material/Tooltip';
import SearchBar2 from '../SearchBar2'

interface Props {
    hidden: boolean
    settings: Settings
    toggleNavVisibility: () => void
    saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
    const { hidden, settings, saveSettings, toggleNavVisibility } = props
    const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const router = useRouter()
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* {hidden ? (
                <IconButton
                    color='inherit'
                    onClick={toggleNavVisibility}
                    sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
                >
                    <Menu />
                </IconButton>
            ) : null} */}

            <IconButton
                color='inherit'
                onClick={toggleNavVisibility}
                sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
            >
                <Menu />
            </IconButton>

            {/* {!hidden ? (
                <div style={{ width: 400, zIndex: 1000 }}>
                    <SearchBar />
                </div>
            ) : null} */}

            <div style={{paddingTop: '10px', paddingBottom: '10px', flex: 1, display: 'flex', justifyContent: 'center'}}>
                <SearchBar2 />
            </div>

            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                {/* {hiddenSm ? null : (
                    <Box
                        component='a'
                        target='_blank'
                        rel='noreferrer'
                        sx={{ mr: 4, display: 'flex' }}
                        href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
                    >
                        <img
                            height={24}
                            alt='github stars'
                            src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
                        />
                    </Box>
                )} */}

                <Tooltip title="Add company">
                    <IconButton color='inherit' aria-haspopup='true' onClick={() => {
                        dispatch(setCompanyData(initialState))
                        dispatch(setNewCompanyData(newCompanyInitialState))

                        router.push('/edit-records', undefined, { shallow: true })
                    }}>
                        <BriefcasePlusOutline />
                    </IconButton>
                </Tooltip>

                <ModeToggler settings={settings} saveSettings={saveSettings} />

                <NotificationDropdown />
                {/* <UserDropdown /> */}

                <div style={{ marginLeft: '10px' }}>
                    <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
                        <ConnectButton chainStatus={'icon'} accountStatus={'avatar'} showBalance={false} />
                    </Box>

                    <Box sx={{ display: { xs: 'initial', md: 'none' } }}>
                        <ConnectButton chainStatus={'icon'} accountStatus={'avatar'} showBalance={false} />
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default AppBarContent
