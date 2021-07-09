import ToggleTheme from '../components/ToggleTheme'
import AuthProvider from '../providers/AuthProvider'
import ThemeProvider from '../providers/ThemeProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'
import '../styles/theme.scss'
import 'nprogress/nprogress.css'

toast.configure({
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider>
        <AuthProvider>
            <Component {...pageProps} />
            <ToggleTheme />
            <ToastContainer />
        </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
