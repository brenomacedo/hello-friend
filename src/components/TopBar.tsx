import styles from '../styles/topbar.module.scss'
import Image from 'next/image'

interface TopBarProps {
    active: 'edit' | 'home' | 'search'
}

export default function TopBar({ active }: TopBarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src="/logo-only-text-transparent.png" alt="Hello friend"
                    objectFit="cover" width={64} height={64} />
            </div>
            <div className={styles.options}>
                <div className={`${styles.option} ${active === 'edit' && styles.active}`}>
                    <p>Edit Profile</p>
                </div>
                <div className={`${styles.option} ${active === 'home' && styles.active}`}>
                    <p>Home</p>
                </div>
                <div className={`${styles.option} ${active === 'search' && styles.active}`}>
                    <p>Search</p>
                </div>
            </div>
            <div className={styles.profile}>
                <p>Breno Macêdo</p>
                <div className={styles.profilePic}>
                    <Image src="https://avatars.githubusercontent.com/u/55261375?v=4" alt="breno"
                        objectFit="cover" width={40} height={40} />
                </div>
            </div>
        </div>
    )
}
