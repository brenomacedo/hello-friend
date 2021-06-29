import SidebarTile from '../components/SidebarTile'
import styles from '../styles/sidebar.module.scss'

interface SidebarProps {
    selected: string
}

export default function Sidebar({ selected }: SidebarProps) {
    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>
                <p>Favourites</p>
            </div>
            <SidebarTile label='All' src='/logo-only-text.png' selected={selected === 'All'} />
            <SidebarTile label='Games' src='/games.png' selected={selected === 'Games'} />
            <SidebarTile label='Series' src='/series.png' selected={selected === 'Series'} />
            <SidebarTile label='Sports' src='/sports.png' selected={selected === 'Sports'} />
        </div>
    )
}
