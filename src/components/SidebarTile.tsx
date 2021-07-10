import Image from 'next/image'
import styles from '../styles/sidebartile.module.scss'

interface SidebarTileProps {
    src: string
    label: string
    selected: boolean
    onClick: () => void
}

export default function SidebarTile({ label, src, selected, onClick }: SidebarTileProps) {

    return (
        <div className={`${styles.container} ${selected && styles.selected}`} onClick={onClick}>
            <div className={styles.icon}>
                <Image src={src} objectFit='cover'
                    width={30} height={30} />
            </div>
            <p className={`${selected && styles.selected}`}>{label}</p>
        </div>
    )
}
