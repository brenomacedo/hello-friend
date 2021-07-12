import Image from 'next/image'
import styles from '../styles/post.module.scss'
import { FaComment, FaHeart } from 'react-icons/fa'
import Button from './Button'
import CommentsList from './CommentsList'
import { createRef, FormEvent, useState } from 'react'
import { api } from '../services/api'
import ThrowAxiosErrors from '../utils/throwAxiosErrors'
import useAuth from '../hooks/useAuth'
import LoadMore from '../components/LoadMore'

type CreatedComment = {
    id: number
    content: string
    postId: number
    userId: number
}

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

type Comment = {
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

type PostWithUser = {
    id: number
    description: string
    imageUrl: string | null
    createdAt: string
    updatedAt: string
    user: Author
    comments: Comment[]
}

export default function Post({ comments, createdAt, description,
    imageUrl, user, id }: PostWithUser) {

    const { user: commentAuthor } = useAuth()

    const [currentComments, setCurrentComments] = useState<Comment[]>(comments)
    const [loading, setLoading] = useState(false)
    const [showCommentList, setShowCommentList] = useState(false)

    const commentRef = createRef<HTMLTextAreaElement>()

    const toggleShowCommentList = () => {
        setShowCommentList(!showCommentList)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(loading)
            return

        setLoading(true)

        try {
            const { data: newComment } = await api.post<CreatedComment>('/comment', {
                postId: id,
                content: commentRef.current?.value
            })

            setCurrentComments([...currentComments, {
                id: newComment.id,
                content: newComment.content,
                postId: newComment.postId,
                userId: newComment.userId,
                author: {
                    about: commentAuthor.about || '',
                    avatar: commentAuthor.avatar || '',
                    email: commentAuthor.email || '',
                    facebook: commentAuthor.facebook || '',
                    githubId: commentAuthor.githubId || 0,
                    id: commentAuthor.id,
                    instagram: commentAuthor.instagram || '',
                    name: commentAuthor.name || '',
                    title: commentAuthor.title || '',
                    twitter: commentAuthor.twitter || '',
                    type: commentAuthor.type
                },
                responses: []
            }])

            if(commentRef.current)
                commentRef.current.value = ''
        } catch(e) {
            ThrowAxiosErrors(e)
        }

        setLoading(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.author}>
                <div className={styles.profilePic}>
                    <Image src={user.avatar || '/default-avatar.png'}
                        width={48} height={48} />
                </div>
                <div className={styles.postInfo}>
                    <p>{user.name}</p>
                    <span>{createdAt}</span>
                </div>
            </div>
            <p>{description}</p>
            {imageUrl && (<div className={styles.postImage}>
                <Image src={`/post/${imageUrl}`}  layout='fill' objectFit='contain' />
            </div>)}
            <div className={styles.postInfos}>
                <p><FaComment /> {currentComments.length}</p>
            </div>
            <div className={styles.commentSection}>
                <form className={styles.writeComment} onSubmit={handleSubmit}>
                    <div className={styles.profilePic}>
                        <Image src={user.avatar || '/default-avatar.png'}
                            width={48} height={48} />
                    </div>
                    <textarea ref={commentRef}
                        placeholder='Write something about this post'></textarea>
                    <Button width='7rem' marginTop='0'>
                        Comment
                    </Button>
                </form>

                {showCommentList && (
                    <CommentsList comments={currentComments} />
                )}
                <LoadMore onClick={toggleShowCommentList} open={showCommentList} />
            </div>
        </div>
    )
}
