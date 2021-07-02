import ToggleTheme from '../components/ToggleTheme'
import ThemeProvider from '../providers/ThemeProvider'
import '../styles/globals.scss'
import '../styles/theme.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
        <Component {...pageProps} />
        <ToggleTheme />
    </ThemeProvider>
  )
}

export default MyApp
