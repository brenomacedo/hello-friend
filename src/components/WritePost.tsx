import styles from '../styles/writepost.module.scss'
import Image from 'next/image'
import Button from './Button'

export default function WritePost() {
    return (
        <div className={styles.container}>
            <div className={styles.write}>
                <div className={styles.profilePic}>
                    <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                        alt='breno' objectFit='cover' width={48} height={48} />
                </div>
                <textarea placeholder='What is in your mind today, Breno?'></textarea>
            </div>
            <div className={styles.images}>
                <div className={styles.addImage}>
                    <p>Add Image</p>
                </div>
            </div>
            <div className={styles.submit}>
                <select className={styles.select}>
                    <option selected disabled>Select the category</option>
                    <option>Games</option>
                    <option>Series</option>
                    <option>Sports</option>
                </select>
                <Button width='12rem' marginTop='0'>
                    Share
                </Button>
            </div>
        </div>
    )
}
