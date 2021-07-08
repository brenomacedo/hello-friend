import ToggleTheme from '../components/ToggleTheme'
import AuthProvider from '../providers/AuthProvider'
import ThemeProvider from '../providers/ThemeProvider'
import '../styles/globals.scss'
import '../styles/theme.scss'

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider>
        <AuthProvider>
            <Component {...pageProps} />
            <ToggleTheme />
        </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
