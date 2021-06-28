import styles from '../styles/infoinput.module.scss'
import Input from './Input'
import { FiUser } from 'react-icons/fi'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface InfoInputProps {
    label: string
    width?: string
    Icon: IconType
}

export default React.forwardRef<HTMLInputElement, InfoInputProps>(({ label, width, Icon }, ref) => {
    return (
        <div className={styles.infoInput}>
            <p>{label}</p>
            <Input placeholder={`Enter your ${label}`} Icon={Icon} ref={ref} width={width} isInfo />
        </div>
    )
})
