import styles from '../../styles/seeposts.module.scss'
import TopBar from '../../components/TopBar'
import UserPost from '../../components/UserPost'
import Head from 'next/head'

export default function SeePosts() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - See Posts</title>
            </Head>
            <TopBar active='edit' />
            <div className={styles.postListContainer}>
                <div className={styles.postList}>
                    <UserPost />
                    <UserPost />
                    <UserPost />
                    <UserPost />
                </div>
            </div>
        </div>
    )
}
