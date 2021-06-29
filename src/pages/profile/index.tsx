import SidebarTile from '../../components/SidebarTile'
import styles from '../../styles/profile.module.scss'

export default function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <div className={styles.title}>
                        <p>Favourites</p>
                    </div>
                    <SidebarTile label='All' src='/logo-only-text.png' />
                    <SidebarTile label='Games' src='/games.png' />
                    <SidebarTile label='Series' src='/series.png' />
                    <SidebarTile label='Sports' src='/sports.png' />
                </div>
                <div className={styles.feed}>

                </div>
            </div>
        </div>
    )
}
