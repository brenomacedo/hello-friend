import Image from 'next/image'
import styles from '../styles/sidebartile.module.scss'

interface SidebarTileProps {
    src: string
    label: string
}

export default function SidebarTile({ label, src }: SidebarTileProps) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Image src={src} objectFit='cover'
                    width={30} height={30} />
            </div>
            <p>{label}</p>
        </div>
    )
}
