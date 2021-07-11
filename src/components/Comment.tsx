import Image from 'next/image'
import { createRef, FormEvent, useState } from 'react'
import styles from '../styles/comment.module.scss'
import Button from './Button'
import LoadMore from './LoadMore'
import Response from './Response'
import ThrowAxiosErrors from '../utils/throwAxiosErrors'
import { api } from '../services/api'
import useAuth from '../hooks/useAuth'

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

interface CreatedResponse {
    id: number
    content: string
    commentId: number
    authorId: number
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
        commentId: number
        authorId: number
        author: Author
    }[]
}

export default function Comment({ author, content, id, postId, responses: initialResponses, userId }: CommentProps) {

    const [openField, setOpenField] = useState(false)
    const [loading, setLoading] = useState(false)
    const [responses, setResponses] = useState(initialResponses)
    const [writeResponseRef, setWriteResponseRef] = useState('')
    const [showResponses, setShowResponses] = useState(false)

    const { user } = useAuth()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(loading)
            return

        setLoading(true)

        try {
            const { data: newResponse } = await api.post<CreatedResponse>('/response', {
                commentId: id,
                content: writeResponseRef
            })

            setWriteResponseRef('')

            setResponses([...responses, {
                id: newResponse.id,
                content: newResponse.content,
                commentId: newResponse.commentId,
                authorId: newResponse.authorId,
                author: {
                    about: user.about || '',
                    avatar: user.avatar || '',
                    email: user.email || '',
                    facebook: user.facebook || '',
                    githubId: user.githubId || 0,
                    id: user.id,
                    instagram: user.instagram || '',
                    name: user.name || '',
                    title: user.title || '',
                    twitter: user.twitter || '',
                    type: user.type
                }
            }])
        } catch(e) {
            ThrowAxiosErrors(e)
        }

        setLoading(false)
    }

    const toggleOpenField = () => {
        setOpenField(!openField)
    }

    const renderResponses = () => {
        return responses.map(response => {
            return (
                <Response  {...response} key={response.id} />
            )
        })
    }

    const toggleShowResponses = () => {
        setShowResponses(!showResponses)
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

            {showResponses && (<div className={styles.responses}>
                {renderResponses()}
            </div>)}
            <LoadMore open={showResponses} onClick={toggleShowResponses} />
            <div className={styles.writeResponses}>
                {openField ? (
                    <button className={`${styles.writeResponseButton} ${styles.cancel}`}
                        onClick={toggleOpenField}>Cancel</button>
                ) : (
                    <button className={`${styles.writeResponseButton}`}
                        onClick={toggleOpenField}>Answer</button>
                )}
                {openField && (<form onSubmit={handleSubmit} className={styles.submitResponse}>
                    <textarea value={writeResponseRef} onChange={e => setWriteResponseRef(e.target.value)}
                        placeholder='Enter your response'></textarea>
                    <Button marginTop='0' width='7rem'>
                        Answer
                    </Button>
                </form>)}
            </div>
        </div>
    )
}
