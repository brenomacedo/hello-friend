import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/comment.module.scss'
import Button from './Button'
import LoadMore from './LoadMore'
import Response from './Response'

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

interface CommentProps {
    id: number
    content: string
    postId: number
    userId: number
    author: Author
    responses: {
        id: number
        content: string
        postId: number
        userId: number
        author: Author
    }[]
}

export default function Comment({ author, content, id, postId, responses, userId }: CommentProps) {

    const [openField, setOpenField] = useState(false)

    const toggleOpenField = () => {
        setOpenField(!openField)
    }

    const renderResponses = () => {
        return responses.map(response => {
            return (
                <Response {...response} key={response.id} />
            )
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.commentInfo}>
                <div className={styles.profilePic}>
                    <Image src={author.avatar || '/default-avatar.png'}
                        width={48} height={48} />
                </div>
                <strong>{author.name}</strong>
                <div className={styles.content}>{content}</div>
            </div>

            <div className={styles.responses}>
                {renderResponses()}
                <LoadMore />
            </div>
            <div className={styles.writeResponses}>
                {openField ? (
                    <button className={`${styles.writeResponseButton} ${styles.cancel}`}
                        onClick={toggleOpenField}>Cancel</button>
                ) : (
                    <button className={`${styles.writeResponseButton}`}
                        onClick={toggleOpenField}>Answer</button>
                )}
                {openField && (<form className={styles.submitResponse}>
                    <textarea placeholder='Enter your response'></textarea>
                    <Button marginTop='0' width='7rem'>
                        Answer
                    </Button>
                </form>)}
            </div>
        </div>
    )
}
