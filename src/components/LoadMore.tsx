import styles from '../styles/loadmore.module.scss'
import { FiArrowDown } from 'react-icons/fi'

export default function LoadMore() {
    return (
        <div className={styles.loadMore}>
            <div className={styles.line}></div>
            <FiArrowDown className={styles.arrowDown} />
        </div>
    )
}
