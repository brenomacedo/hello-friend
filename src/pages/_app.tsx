import '../styles/globals.scss'
import ThemeProvider from '../providers/ThemeProvider'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
        <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
