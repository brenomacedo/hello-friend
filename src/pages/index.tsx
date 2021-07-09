import styles from '../styles/home.module.scss'
import Image from 'next/image'
import Head from 'next/head'
import router from 'next/router'
import Loading from '../components/Loading'

export default function Home() {

    const goToLogin = () => {
        router.push('/login')
    }

    return (
        <div className={styles.container}>

            <Head>
                <title>Hello Friend - Home</title>
            </Head>

            <div className={styles.banner}>
                <div>
                    <Image src='/logo-text-transparent.png' alt="lobo"
                        width={600} height={600} objectFit='cover' />
                </div>
            </div>
            <div className={styles.next}>
                <div className={styles.info}>
                    <h2>A simple social network, but one that can bring you many friends!</h2>
                    <p>Join right now!</p>
                    <button onClick={goToLogin} className={styles.gonext}>
                        Lets go!
                    </button>
                </div>
            </div>
        </div>
    )
}
