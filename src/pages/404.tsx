import styles from '../styles/404.module.scss'
import Button from '../components/Button'
import Logo from '../components/Logo'
import Head from 'next/head'

export default function Custom404() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Page not found - 404</title>
            </Head>
            <Logo />
            <div className={styles.message}>
                <h2>Error 404</h2>
                <p>Looks like you are lost. How about find yourself by backing to the homepage?</p>
                <Button backgroundColor='#2196f3' width='15rem'>
                    Back to homepage
                </Button>
            </div>
        </div>
    )
}
