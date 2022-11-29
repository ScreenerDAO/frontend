// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const items = [{ id: 0, name: 'Cobol' }, { id: 1, name: 'JavaScript' }, { id: 2, name: 'Basic' }, { id: 3, name: 'PHP' }, { id: 4, name: 'Java' }]

const handleOnSearch = (string: any, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
}

const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result)
}

const handleOnSelect = (item: any) => {
    // the item selected
    console.log(item)
}

const handleOnFocus = () => {
    console.log('Focused')
}

const formatResult = (item: any) => {
    return (
        <>
            <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
        </>
    )
}

interface Props {
    hidden: boolean
    settings: Settings
    toggleNavVisibility: () => void
    saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility } = props

    // ** Hook
    const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {hidden ? (
                <IconButton
                    color='inherit'
                    onClick={toggleNavVisibility}
                    sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
                >
                    <Menu />
                </IconButton>
            ) : null}

            {!hidden ? (
                <div style={{ width: 400, zIndex: 1000 }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                </div>
            ) : null}

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
                <ModeToggler settings={settings} saveSettings={saveSettings} />
                <NotificationDropdown />
                {/* <UserDropdown /> */}
                <div style={{ marginLeft: '10px' }}>
                    <ConnectButton chainStatus={'icon'} accountStatus={'avatar'} showBalance={false} />
                </div>
            </Box>
        </Box>
    )
}

export default AppBarContent
