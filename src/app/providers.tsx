'use client'

import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, mainnet, goerli } from 'wagmi';
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import ICompanyEthData from '@/lib/types/ICompanyEthData';
import React from 'react';
import { SettingsConsumer, SettingsProvider } from '@/@core/context/settingsContext'
import ThemeComponent from '@/@core/theme/ThemeComponent'
import UserLayout from '@/layouts/UserLayout';
import { Provider } from 'react-redux';
import store from '@/store';
import { setCompanyLoading } from '@/features/general';
import { selectCompany } from '@/lib/methods/generalMethods';

const { chains, provider } = configureChains(
    [mainnet, goerli, sepolia],
    [publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

export default function Providers({ companies, children }: {
    companies: ICompanyEthData[]
    children: React.ReactNode
}) {
    React.useEffect(() => {
        const callback = async () => {
            store.dispatch(setCompanyLoading(true))

            const searchParams = new URLSearchParams(window.location.search)
            const companyId = searchParams.get('id')
            const isNewCompany = searchParams.get('isNewCompany')

            if (!isNewCompany) {
                if (!companyId && !store.getState().newCompanyData.id) {
                    selectCompany(companies[0], store.dispatch)
                }
                else {
                    selectCompany(companies[Number(companyId)], store.dispatch)
                }
            }
            else {
                store.dispatch(setCompanyLoading(false))
            }
        }

        callback()
    }, [])

    return (
        <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider coolMode chains={chains}>
                    <SettingsProvider>
                        <SettingsConsumer>
                            {({ settings }) => {
                                return (
                                    <ThemeComponent
                                        settings={settings}
                                    >
                                        <UserLayout companies={companies}>
                                            {children}
                                        </UserLayout>
                                    </ThemeComponent>
                                )
                            }}
                        </SettingsConsumer>
                    </SettingsProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </Provider>
    )
}