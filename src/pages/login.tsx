import { FormEvent, useEffect, useState } from 'react'
import styles from '../styles/login.module.scss'
import { FaCheck } from 'react-icons/fa'
import Input from '../components/Input'
import Head from 'next/head'
import { createRef } from 'react'
import PasswordInput from '../components/PasswordInput'
import { FiLock, FiMail } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import Button from '../components/Button'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import router from 'next/router'

export default function Login() {

    const { signIn, signInWithGithub } = useAuth()

    const [remember, setRemember] = useState(false)

    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()

    const toggleRemember = () => {
        setRemember(!remember)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        signIn(
            remember,
            emailRef.current?.value,
            passwordRef.current?.value
        )

    }

    useEffect(() => {

        function verifyGithubLogin() {
            const url = window.location.href
            const hasCode = url.includes("?code=")

            if(hasCode) {
                const code = url.split('?code=')[1]
                signInWithGithub(code)
            }
        }

        verifyGithubLogin()

    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Login</title>
            </Head>
            <div className={styles.formContainer}>
                <div className={styles.form}>
                    <h1>Hello!</h1>
                    <p>Sign in to your account!</p>
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="E-mail" Icon={FiMail} ref={emailRef} />
                        <PasswordInput placeholder="Password"
                            Icon={FiLock} ref={passwordRef} />
                        <div className={styles.options}>
                            <div className={styles.remember}>
                                <div onClick={toggleRemember}
                                    className={`${styles.checkbox} ${remember && styles.active}`}>
                                    <FaCheck className={styles.checkIcon} />
                                </div>
                                <span>Remember me</span>
                            </div>
                            <div className={styles.forgotPassword}>
                                <Link href='/forgot-password'>
                                    <span>
                                        Forgot password?
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <Button>
                            Sign in
                        </Button>
                        <p>Don't have an account? <Link href='/register'><strong>Create</strong></Link></p>
                    </form>
                </div>
            </div>
            <div className={styles.message}>
                <h2>Welcome back!</h2>
                <p>Glad you're here! We hope you get good conversations and new friends!</p>
                <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`} className={styles.github}>
                    <FaGithub className={styles.githubIcon} /> Sign in with github
                </a>
                <p>Login with github or create your account!</p>
            </div>
        </div>
    )
}
