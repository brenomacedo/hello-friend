import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import Button from '../components/Button'
import Input from '../components/Input'
import PasswordInput from '../components/PasswordInput'
import styles from '../styles/register.module.scss'
import Head from 'next/head'

export default function Register() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Register</title>
            </Head>
            <form className={styles.form}>
                <h2>Register</h2>
                <Input placeholder="Name" Icon={FiUser} />
                <Input placeholder="E-mail" Icon={FiMail} />
                <PasswordInput placeholder="Password" Icon={FiLock} />
                <PasswordInput placeholder="Confirm your password" toggleEye={false} Icon={FiLock} />
                <Button>
                    Register
                </Button>
                <p>Already have an account? <strong>Sign in</strong></p>
            </form>
        </div>
    )
}
