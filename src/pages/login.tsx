import { useState } from 'react'
import styles from '../styles/login.module.scss'
import { FaCheck } from 'react-icons/fa'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useCallback } from 'react'
import Head from 'next/head'

export default function Login() {

    const [remember, setRemember] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)

    const toggleRemember = useCallback(() => {
        setRemember(!remember)
    }, [remember])

    const toggleViewPassword = useCallback(() => {
        setViewPassword(!viewPassword)
    }, [viewPassword])

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend- Login</title>
            </Head>
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    <h1>Hello!</h1>
                    <p>Sign in to your account!</p>
                    <form>
                        <div className={styles.inputContainer}>
                            <FiMail className={styles.labelIcon} />
                            <input type="text" placeholder="E-mail" />
                        </div>
                        <div className={styles.inputContainer}>
                            <FiLock className={styles.labelIcon} />
                            {viewPassword ? (
                                <FiEye className={styles.eye} onClick={toggleViewPassword} />
                            ) : (
                                <FiEyeOff className={styles.eye} onClick={toggleViewPassword} />
                            )}
                            <input type={viewPassword ? 'text' : 'password'} placeholder="Password" />
                        </div>
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
                        <button className={styles.loginButton}>
                            Sign in
                        </button>
                        <p>Don't have an account? <strong>Create</strong></p>
                    </form>
                </div>
            </div>
            <div className={styles.message}>
                <h2>Welcome back!</h2>
                <p>Glad you're here! We hope you get good conversations and new friends!</p>
            </div>
        </div>
    )
}
