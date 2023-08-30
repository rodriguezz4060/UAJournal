import 'macro-css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { theme } from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
  <Component {...pageProps} />
  </MuiThemeProvider>
  )
}
