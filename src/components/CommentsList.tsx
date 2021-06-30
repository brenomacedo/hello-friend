import { FiArrowDown } from 'react-icons/fi'
import styles from '../styles/commentslist.module.scss'
import Comment from './Comment'
import LoadMore from './LoadMore'

export default function CommentsList() {
    return (
        <div className={styles.container}>
            <Comment />
            <LoadMore />
        </div>
    )
}
