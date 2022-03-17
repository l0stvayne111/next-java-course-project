import '../styles/globals.scss'
import '../styles/bootstrap-grid.min.css'
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'


import {setupStore} from "../redux";
import {Provider as ReduxProvider} from "react-redux";
import {AnimatePresence} from "framer-motion";

const store = setupStore();

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <AnimatePresence exitBeforeEnter>
            <ReduxProvider store={store}>
                <Component {...pageProps} />
            </ReduxProvider>
        </AnimatePresence>

    )
}
