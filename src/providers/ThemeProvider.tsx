import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeProps {
    theme: 'dark' | 'light'
    toggleTheme: () => void
}

interface ThemeProviderProps {
    children: ReactNode
}

declare global {
    interface Window {
        __onThemeChange: any
        __theme: any
        __setPreferredTheme: any
    }
}

const ThemeContext = createContext<ThemeProps>({} as any)

export default function ThemeProvider({ children }: ThemeProviderProps) {

    const [theme, setTheme] = useState(global.window?.__theme || 'light')

    const toggleTheme = () => {
        global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        global.window.__onThemeChange = setTheme
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {
    ThemeContext
}
