import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { I18NProvider } from 'context/i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NProvider>
  )
}

export default appWithTranslation(MyApp)
