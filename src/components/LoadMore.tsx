import styles from '../styles/loadmore.module.scss'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

interface LoadMoreProps {
    open: boolean
    onClick: () => void
}

export default function LoadMore({ open, onClick }: LoadMoreProps) {
    return (
        <div className={styles.loadMore} onClick={onClick}>
            <div className={styles.line}></div>
            {open ? (
                <FiArrowUp className={styles.arrowDown} />
            ) : (
                <FiArrowDown className={styles.arrowDown} />
            )}
        </div>
    )
}
