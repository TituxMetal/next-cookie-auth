import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { ContextProvider } from '../context'
import { theme } from '../components/styled'
import { getSessionFromClient, getSessionFromServer } from '../lib'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    const authStatus = !ctx.req ? await getSessionFromClient() : await getSessionFromServer(ctx.req)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, authStatus }
  }

  render () {
    const { Component, pageProps, router, authStatus } = this.props
    const { pathname } = router

    return (
      <Container>
        <ContextProvider pathname={pathname} authStatus={authStatus}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ContextProvider>
      </Container>
    )
  }
}

export default MyApp
