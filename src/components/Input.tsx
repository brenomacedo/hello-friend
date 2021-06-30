import styles from '../styles/input.module.scss'
import React from 'react'
import { IconType } from 'react-icons'

interface InputProps {
    Icon: IconType
    placeholder: string
    width?: string
    isInfo?: boolean
    marginTop?: string
    containerFlex?: string
}

export default
    React.forwardRef<HTMLInputElement, InputProps>(({ Icon, placeholder, width, marginTop, isInfo = false,
        containerFlex }, ref) => {
    return (
        <div className={styles.inputContainer} style={{ flex: containerFlex }}>
            <Icon className={styles.labelIcon}
                style={{ top: isInfo ? '1.25rem' : `${Number(marginTop?.split('rem')[0]) + 0.95}rem` }} />
            <input ref={ref} type="text" placeholder={placeholder}
                style={{
                    width,
                    marginTop: isInfo ? '0.4rem' : marginTop
                }}
            />
        </div>
    )
})
