import styles from '../styles/logout.module.scss'
import { FiLogOut } from 'react-icons/fi'
import useAuth from '../hooks/useAuth'

export default function Logout() {

    const { logout } = useAuth()

    return (
        <div className={styles.container} onClick={logout}>
            <FiLogOut className={styles.icon} />
        </div>
    )
}
