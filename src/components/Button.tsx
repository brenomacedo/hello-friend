import { ReactNode } from 'react'
import styles from '../styles/button.module.scss'

interface ButtonProps {
    children: ReactNode
    width?: string
    backgroundColor?: string
    marginTop?: string
    color?: string
}

export default function Button({ children, width, backgroundColor, marginTop, color }: ButtonProps) {
    return (
        <button
            style={{ width, background: backgroundColor, marginTop, color: color }}
            className={styles.loginButton}>
            {children}
        </button>
    )
}
