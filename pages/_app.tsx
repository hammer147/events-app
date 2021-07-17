import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '../store/NotificationContext'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next.js Events</title>
          <meta name="description" content="Next.js Events" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
