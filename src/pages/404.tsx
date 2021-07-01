import styles from '../styles/404.module.scss'
import Button from '../components/Button'
import Logo from '../components/Logo'

export default function Custom404() {
    return (
        <div className={styles.container}>
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
