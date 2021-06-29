import Image from 'next/image'
import styles from '../styles/post.module.scss'
import { FaComment, FaHeart } from 'react-icons/fa'
import Button from './Button'
import CommentsList from './CommentsList'

export default function Post() {
    return (
        <div className={styles.container}>
            <div className={styles.author}>
                <div className={styles.profilePic}>
                    <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                        width={48} height={48} />
                </div>
                <div className={styles.postInfo}>
                    <p>Breno Macêdo</p>
                    <span>8 hours ago</span>
                </div>
            </div>
            <p>Esse é o meu post! Apreciem-o!</p>
            <div className={styles.postImage}>
                <Image src='/postimage.jpg'  layout='fill' objectFit='contain' />
            </div>
            <div className={styles.postInfos}>
                <p className={`${styles.liked}`}><FaHeart /> 80</p>
                <p><FaComment /> 30</p>
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

                <CommentsList />
            </div>
        </div>
    )
}
