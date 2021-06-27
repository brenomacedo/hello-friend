import styles from '../styles/home.module.scss'
import Head from 'next/head'

export default function Home () {
  return (
    <div className={styles.container}>

        <Head>
            <title>Hello Friend - Início</title>
        </Head>

        <div className={styles.banner}>
            <img src='/logo-text-transparent.png' alt="lobo" />
        </div>
        <div className={styles.next}>
            <div className={styles.info}>
                <h2>A simple social network, but one that can bring you many friends!</h2>
                <p>Join right now!</p>
                <button className={styles.gonext}>
                    Lets go!
                </button>
            </div>
        </div>
    </div>
  )
}
