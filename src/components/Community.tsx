import styles from '../styles/community.module.scss'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'

interface CommunityProps {
    active: boolean
    label: string
    src: string
    categoryId: number
    name: string
}

export default function Community({ active, label, src, categoryId, name }: CommunityProps) {

    const { followCategory, unfollowCategory } = useAuth()

    const toggleFollow = () => {
        if(active) {
            unfollowCategory(categoryId)
        } else {
            followCategory(categoryId, name)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.communityInfo}>
                <div className={styles.communityPic}>
                    <Image src={src} objectFit='cover'
                        width={32} height={32} />
                </div>
                <p>{label}</p>
            </div>
            <div className={`${styles.favorites} ${active && styles.active}`} onClick={toggleFollow} >
                <FaStar />
            </div>
        </div>
    )
}
