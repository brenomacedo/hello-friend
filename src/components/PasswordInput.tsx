import React, { useCallback, useState } from 'react'
import { IconType } from 'react-icons'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import styles from '../styles/input.module.scss'

interface PasswordInputProps {
    Icon: IconType
    toggleEye?: boolean
    placeholder: string
    width?: string
}

export default
    React.forwardRef<HTMLInputElement, PasswordInputProps>(({ Icon, toggleEye = true, placeholder, width }, ref) => {

    const [viewPassword, setViewPassword] = useState(false)

    const toggleViewPassword = useCallback(() => {
        setViewPassword(!viewPassword)
    }, [viewPassword])

    return (
        <div className={styles.inputContainer}>
            <Icon className={styles.labelIcon} />
            {toggleEye && (
                viewPassword ?(
                    <FiEye className={styles.eye} onClick={toggleViewPassword} role='switch' />
                ) : (
                    <FiEyeOff className={styles.eye} onClick={toggleViewPassword} role='switch' />
                )
            )}
            <input ref={ref} type={viewPassword ? 'text' : 'password'} placeholder={placeholder}
                style={{ width }} />
        </div>
    )
})
