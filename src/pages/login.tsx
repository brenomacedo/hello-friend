import { useState } from 'react'
import styles from '../styles/login.module.scss'
import { FaCheck } from 'react-icons/fa'
import { Input } from '../components/Input'
import { useCallback } from 'react'
import Head from 'next/head'
import { createRef } from 'react'
import { PasswordInput } from '../components/PasswordInput'
import { FiLock, FiMail } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import Button from '../components/Button'

export default function Login() {

    const [remember, setRemember] = useState(false)

    const nameRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()

    const toggleRemember = useCallback(() => {
        setRemember(!remember)
    }, [remember])

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Login</title>
            </Head>
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    <h1>Hello!</h1>
                    <p>Sign in to your account!</p>
                    <form>
                        <Input placeholder="E-mail" Icon={FiMail} ref={nameRef} />
                        <PasswordInput placeholder="Password"
                            Icon={FiLock} ref={passwordRef} toggleEye={false} />
                        <div className={styles.options}>
                            <div className={styles.remember}>
                                <div onClick={toggleRemember}
                                    className={`${styles.checkbox} ${remember && styles.active}`}>
                                    <FaCheck className={styles.checkIcon} />
                                </div>
                                <span>Remember me</span>
                            </div>
                            <div className={styles.forgotPassword}>
                                <span>Forgot password?</span>
                            </div>
                        </div>
                        <Button>
                            Sign in
                        </Button>
                        <p>Don't have an account? <strong>Create</strong></p>
                    </form>
                </div>
            </div>
            <div className={styles.message}>
                <h2>Welcome back!</h2>
                <p>Glad you're here! We hope you get good conversations and new friends!</p>
                <div className={styles.github}>
                    <FaGithub className={styles.githubIcon} /> Sign in with github
                </div>
                <p>Login with github or create your account!</p>
            </div>
        </div>
    )
}
