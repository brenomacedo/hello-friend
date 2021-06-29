import styles from '../styles/404.module.scss'
import Image from 'next/image'
import Button from '../components/Button'

export default function Custom404() {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src='/logo.png' objectFit='cover' width={512} height={512} />
            </div>
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
