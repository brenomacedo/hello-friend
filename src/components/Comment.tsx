import Image from 'next/image'
import styles from '../styles/comment.module.scss'
import Button from './Button'

export default function Comment() {

    const renderResponses = () => {
        return (
            <>
                <div className={styles.responseInfo}>
                    <div className={styles.profilePic}>
                        <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                            width={32} height={32} />
                    </div>
                    <div className={styles.content}>Olá amigo, tudo bem com você?</div>
                </div>
                <div className={styles.responseInfo}>
                    <div className={styles.profilePic}>
                        <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                            width={32} height={32} />
                    </div>
                    <div className={styles.content}>Olá amigo, tudo bem com você?</div>
                </div>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.commentInfo}>
                <div className={styles.profilePic}>
                    <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                        width={48} height={48} />
                </div>
                <div className={styles.content}>Olá amigo, tudo bem com você?</div>
            </div>

            <div className={styles.responses}>
                {renderResponses()}
            </div>
            <div className={styles.writeResponses}>
                <button className={`${styles.writeResponseButton}`}>Answer</button>
                <form className={styles.submitResponse}>
                    <textarea placeholder='Enter your response'></textarea>
                    <Button marginTop='0' width='7rem'>
                        Answer
                    </Button>
                </form>
            </div>
        </div>
    )
}
