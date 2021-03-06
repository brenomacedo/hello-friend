import styles from '../styles/404.module.scss'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Head from 'next/head'

export default function Custom500() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Internal server error - 500</title>
            </Head>
            <Logo />
            <div className={styles.message}>
                <h2>Error 500</h2>
                <p>Internal server error</p>
                <Button backgroundColor='#2196f3' width='15rem'>
                    Back to homepage
                </Button>
            </div>
        </div>
    )
}
