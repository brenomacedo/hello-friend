import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import WritePost from '../../components/WritePost'
import styles from '../../styles/profile.module.scss'
import Head from 'next/head'

export default function Profile() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Profile</title>
            </Head>
            <TopBar active='home' />
            <div className={styles.home}>
                <div className={styles.content}>
                    <Sidebar selected='Games' />
                    <div className={styles.feed}>
                        <WritePost />
                    </div>
                </div>
            </div>
        </div>
    )
}
