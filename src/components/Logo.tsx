import styles from '../styles/logo.module.scss'
import Image from 'next/image'

export default function Logo() {
    return (
        <div className={styles.image}>
            <Image src='/logo.png' objectFit='cover' width={512} height={512} />
        </div>
    )
}
