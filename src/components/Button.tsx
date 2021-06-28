import { ReactNode } from 'react'
import styles from '../styles/button.module.scss'

interface ButtonProps {
    children: ReactNode
    width?: string
    backgroundColor?: string
}

export default function Button({ children, width, backgroundColor }: ButtonProps) {
    return (
        <button
            style={{ width: width, background: backgroundColor }}
            className={styles.loginButton}>
            {children}
        </button>
    )
}
