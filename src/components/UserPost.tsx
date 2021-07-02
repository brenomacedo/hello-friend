import styles from '../styles/post.module.scss'
import Image from 'next/image'
import { FaComment, FaHeart } from 'react-icons/fa'
import Button from './Button'
import { useState } from 'react'

export default function UserPost() {

    const [update, setUpdate] = useState(false)

    const toggleEdit = () => {
        setUpdate(!update)
    }

    return (
        <div className={styles.container} style={{ flex: 1 }}>
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
            {update ? (
                <>
                    <textarea className={styles.editField} value='Esse é o meu post! Apreciem-o!'></textarea>
                    <Button width='100%' marginTop='0'>Save</Button>
                </>
            ) : (
                <p>Esse é o meu post! Apreciem-o!</p>
            )}
            <div className={styles.postImage}>
                <Image src='/postimage.jpg'  layout='fill' objectFit='contain' />
            </div>
            <div className={styles.postInfos}>
                <p className={`${styles.liked}`}><FaHeart /> 80</p>
                <p><FaComment /> 30</p>
            </div>
            <div className={styles.editPost}>
                {update ? (
                    <Button onClick={toggleEdit}
                        width='100%' backgroundColor='#b388ff'>Cancel Edit</Button>
                ) : (
                    <Button onClick={toggleEdit}
                        width='100%' backgroundColor='#2196f3'>Edit</Button>
                )}
                <Button width='100%' backgroundColor='#f44336'>Delete</Button>
            </div>
        </div>
    )
}
