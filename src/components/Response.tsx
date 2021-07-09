import styles from '../styles/comment.module.scss'
import Image from 'next/image'

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

interface ResponseProps {
    id: number
    content: string
    postId: number
    userId: number
    author: Author
}

export default function Response({ author, content }: ResponseProps) {
    return (
        <div className={styles.responseInfo}>
            <div className={styles.profilePic}>
                <Image src={author.avatar || '/default-avatar.png'}
                    width={32} height={32} />
            </div>
            <strong>{author.name}</strong>
            <div className={styles.content}>{content}</div>
        </div>
    )
}
