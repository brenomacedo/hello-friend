import { FiArrowDown } from 'react-icons/fi'
import styles from '../styles/commentslist.module.scss'
import Comment from './Comment'
import LoadMore from './LoadMore'

type Author = {
    id: number
    type: string
    name: string
    email: string | null
    title: string | null
    avatar: string | null
    about: string | null
    facebook: string | null
    twitter: string | null
    instagram: string | null
    githubId: number | null
}

interface CommentsListProps {
    comments: {
        id: number
        content: string
        postId: number
        userId: number
        author: Author
        responses: {
            id: number
            content: string
            commentId: number
            authorId: number
            author: Author
        }[]
    }[]
}

export default function CommentsList({ comments }: CommentsListProps) {

    const renderComments = () => {
        return comments.map(comment => {
            return <Comment {...comment} key={comment.id}/>
        })
    }

    return (
        <div className={styles.container}>
            {renderComments()}
        </div>
    )
}
