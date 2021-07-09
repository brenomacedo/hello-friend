import styles from '../styles/topbar.module.scss'
import Image from 'next/image'
import router from 'next/router'

interface TopBarProps {
    active: 'edit' | 'home' | 'search'
}

export default function TopBar({ active }: TopBarProps) {

    const navigate = (to: string) => {
        if(to === active)
            return

        router.push(to)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src="/logo-only-text-transparent.png" alt="Hello friend"
                    objectFit="cover" width={64} height={64} />
            </div>
            <div className={styles.options}>
                <div className={`${styles.option} ${active === 'edit' && styles.active}`}
                    onClick={() => navigate('/profile/edit')}>
                    <p>Edit Profile</p>
                </div>
                <div className={`${styles.option} ${active === 'home' && styles.active}`}
                    onClick={() => navigate('/profile')}>
                    <p>Home</p>
                </div>
                <div className={`${styles.option} ${active === 'search' && styles.active}`}
                    onClick={() => navigate('/profile/search')}>
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
