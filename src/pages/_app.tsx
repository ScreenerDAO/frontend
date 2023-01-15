import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
    WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from 'react-redux'
import store from '../store'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { THEGRAPH_API_URL } from 'src/metadata'
import React from 'react'
import { selectCompany } from 'src/helpers/generalMethods'
import { setCompanyLoading } from 'src/features/general'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
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

const client = new ApolloClient({
    uri: THEGRAPH_API_URL,
    cache: new InMemoryCache()
})

if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}

const COMPANY_QUERY = gql`
    query Company($id: ID!) {
        company(id: $id) {
            id
            name
            ticker
            dataHash
        }
    }
`

const App = (props: ExtendedAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
    const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

    React.useEffect(() => {
        store.dispatch(setCompanyLoading(true))
        client.query({query: COMPANY_QUERY, variables: {id: "0"}})
            .then((result) => selectCompany(result.data.company, store.dispatch))
    }, [])

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
                <meta
                    name='description'
                    content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
                />
                <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <ApolloProvider client={client}>
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider coolMode chains={chains}>
                        <Provider store={store}>
                            <SettingsProvider>
                                <SettingsConsumer>
                                    {({ settings }) => {
                                        return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
                                    }}
                                </SettingsConsumer>
                            </SettingsProvider>
                        </Provider>
                    </RainbowKitProvider>
                </WagmiConfig>
            </ ApolloProvider>
        </CacheProvider>
    )
}

export default App
