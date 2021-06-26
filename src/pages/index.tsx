import styles from '../styles/home.module.scss'

export default function Home () {
  return (
    <div className={styles.container}>
        <div className={styles.banner}>
            <img src='/logo-text-transparent.png' alt="lobo" />
        </div>
        <div className={styles.next}>
            <div className={styles.info}>
                <h2>Uma rede social simples, mas que pode te trazer muitos amigos!</h2>
                <p>Inscreva-se agora mesmo!</p>
                <button className={styles.gonext}>
                    Prosseguir
                </button>
            </div>
        </div>
    </div>
  )
}
