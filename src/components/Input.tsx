import styles from '../styles/input.module.scss'
import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
    Icon: IconType
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ Icon }, ref) => {
    return (
        <div className={styles.inputContainer}>
            <Icon className={styles.labelIcon} />
            <input ref={ref} type="text" placeholder="E-mail" />
        </div>
    )
})
