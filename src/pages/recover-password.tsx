import styles from '../styles/forgotpassword.module.scss'
import Logo from '../components/Logo'
import PasswordInput from '../components/PasswordInput'
import { FiCode, FiLock } from 'react-icons/fi'
import Input from '../components/Input'
import Button from '../components/Button'

export default function RecoverPassword() {
    return (
        <div className={styles.container}>
            <Logo />
            <h2>Recover your password</h2>
            <p>We sent an email to you with a verification token, enter it below to create a new password</p>
            <form>
                <Input placeholder='Enter your verification token' Icon={FiCode} />
                <PasswordInput placeholder='Enter your new password' Icon={FiLock} />
                <PasswordInput placeholder='Confirm your new password' Icon={FiLock} toggleEye={false} />
                <Button backgroundColor='#2196f3'>
                    Create new password
                </Button>
            </form>
        </div>
    )
}
