import styles from '../styles/toggletheme.module.scss'
import { FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '../hooks/useTheme'

export default function ToggleTheme() {

    const { toggleTheme, isDark } = useTheme()

    return (
        <div className={styles.container} onClick={toggleTheme}>
            {isDark ? (
                <FiSun className={styles.sun} />
            ) : (
                <FiMoon className={styles.moon} />
            )}
        </div>
    )
}
