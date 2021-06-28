import styles from '../styles/input.module.scss'
import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
    Icon: IconType
    placeholder: string
    width?: string
    isInfo?: boolean
}

export default
    React.forwardRef<HTMLInputElement, InputProps>(({ Icon, placeholder, width, isInfo = false }, ref) => {
    return (
        <div className={styles.inputContainer}>
            <Icon className={styles.labelIcon}
                style={{ top: isInfo ? '1.25rem' : undefined }} />
            <input ref={ref} type="text" placeholder={placeholder}
                style={{
                    width,
                    marginTop: isInfo ? '0.4rem' : undefined
                }}
            />
        </div>
    )
})
