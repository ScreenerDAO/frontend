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
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, mainnet, goerli } from 'wagmi';
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from 'react-redux'
import store from '../store'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const { chains, provider } = configureChains(
    [mainnet, goerli, sepolia ],
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

const App = (props: ExtendedAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
    const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

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
        </CacheProvider>
    )
}

export default App
