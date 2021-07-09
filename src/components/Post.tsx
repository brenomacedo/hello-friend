import Image from 'next/image'
import styles from '../styles/post.module.scss'
import { FaComment, FaHeart } from 'react-icons/fa'
import Button from './Button'
import CommentsList from './CommentsList'

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

type PostWithUser = {
    id: number
    description: string
    imageUrl: string | null
    createdAt: string
    updatedAt: string
    user: Author
    comments: {
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
    }[]
}

export default function Post({ comments, createdAt, description,
    imageUrl, user }: PostWithUser) {
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
                <Image src='/postimage.jpg'  layout='fill' objectFit='contain' />
            </div>)}
            <div className={styles.postInfos}>
                <p><FaComment /> {comments.length}</p>
            </div>
            <div className={styles.commentSection}>
                <form className={styles.writeComment}>
                    <div className={styles.profilePic}>
                        <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                            width={48} height={48} />
                    </div>
                    <textarea placeholder='Write something about this post'></textarea>
                    <Button width='7rem' marginTop='0'>
                        Comment
                    </Button>
                </form>

                <CommentsList comments={comments} />
            </div>
        </div>
    )
}
