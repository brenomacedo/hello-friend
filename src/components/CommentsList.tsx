import styles from '../styles/commentslist.module.scss'
import Comment from './Comment'

export default function CommentsList() {
    return (
        <div className={styles.container}>
            <Comment />
        </div>
    )
}
