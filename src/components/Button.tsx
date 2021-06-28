import { ReactNode } from 'react'
import styles from '../styles/button.module.scss'

interface ButtonProps {
    children: ReactNode
    width?: string
    backgroundColor?: string
    marginTop?: string
}

export default function Button({ children, width, backgroundColor, marginTop }: ButtonProps) {
    return (
        <button
            style={{ width, background: backgroundColor, marginTop }}
            className={styles.loginButton}>
            {children}
        </button>
    )
}
