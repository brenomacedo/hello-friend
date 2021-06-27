import { ReactNode } from 'react'
import styles from '../styles/button.module.scss'

interface ButtonProps {
    children: ReactNode
}

export default function Button({ children }: ButtonProps) {
    return (
        <button className={styles.loginButton}>
            {children}
        </button>
    )
}
