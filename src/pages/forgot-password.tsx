import styles from '../styles/forgotpassword.module.scss'
import Logo from '../components/Logo'
import Input from '../components/Input'
import { FiMail } from 'react-icons/fi'
import Button from '../components/Button'

export default function RecoverPassword() {
    return (
        <div className={styles.container}>
            <Logo />
            <h2>Forgot your password?</h2>
            <p>Don't worry! Enter your email and we'll send a verification code to recover it!</p>
            <form>
                <Input Icon={FiMail} placeholder='Enter your E-mail' />
                <Button backgroundColor='#2196f3'>
                    Send E-mail
                </Button>
            </form>
        </div>
    )
}
