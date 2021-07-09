import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import Button from '../components/Button'
import Input from '../components/Input'
import PasswordInput from '../components/PasswordInput'
import styles from '../styles/register.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { createRef, FormEvent } from 'react'

export default function Register() {

    const nameRef = createRef<HTMLInputElement>()
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const confirmPasswordRef = createRef<HTMLInputElement>()

    const { signUp } = useAuth()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signUp(
            nameRef.current?.value,
            emailRef.current?.value,
            passwordRef.current?.value,
            confirmPasswordRef.current?.value
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Register</title>
            </Head>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Register</h2>
                <Input ref={nameRef} placeholder="Name" Icon={FiUser} />
                <Input ref={emailRef} placeholder="E-mail" Icon={FiMail} />
                <PasswordInput ref={passwordRef} placeholder="Password" Icon={FiLock} />
                <PasswordInput ref={confirmPasswordRef} placeholder="Confirm your password"
                    toggleEye={false} Icon={FiLock} />
                <Button>
                    Register
                </Button>
                <p>Already have an account? <Link href='/login'><strong>Sign in</strong></Link></p>
            </form>
        </div>
    )
}
