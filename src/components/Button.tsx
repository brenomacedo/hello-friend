import { ReactNode } from 'react'
import styles from '../styles/button.module.scss'

interface ButtonProps {
    children: ReactNode
    width?: string
    backgroundColor?: string
    marginTop?: string
    color?: string
    onClick?: () => void
}

export default function Button({ children, width, backgroundColor, marginTop, color, onClick }: ButtonProps) {
    return (
        <button role='button' onClick={onClick}
            style={{ width, background: backgroundColor, marginTop, color: color }}
            className={styles.loginButton}>
            {children}
        </button>
    )
}
