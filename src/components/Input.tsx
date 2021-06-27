import styles from '../styles/input.module.scss'
import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
    Icon: IconType
    placeholder: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ Icon, placeholder }, ref) => {
    return (
        <div className={styles.inputContainer}>
            <Icon className={styles.labelIcon} />
            <input ref={ref} type="text" placeholder={placeholder} />
        </div>
    )
})
