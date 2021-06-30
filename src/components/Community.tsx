import styles from '../styles/community.module.scss'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

interface CommunityProps {
    active: boolean
    label: string
    src: string
}

export default function Community({ active, label, src }: CommunityProps) {
    return (
        <div className={styles.container}>
            <div className={styles.communityInfo}>
                <div className={styles.communityPic}>
                    <Image src={src} objectFit='cover'
                        width={32} height={32} />
                </div>
                <p>{label}</p>
            </div>
            <div className={`${styles.favorites} ${active && styles.active}`}>
                <FaStar />
            </div>
        </div>
    )
}
