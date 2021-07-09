import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import WritePost from '../../components/WritePost'
import styles from '../../styles/profile.module.scss'
import Head from 'next/head'
import Post from '../../components/Post'
import router from 'next/router'
import Loading from '../../components/Loading'
import useAuth from '../../hooks/useAuth'
import Logout from '../../components/Logout'

export default function Profile() {

    const { isAuth } = useAuth()

    if(isAuth === undefined)
        return <Loading />
    else if(!isAuth) {
        router.push('/login')
        return false
    }

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
                        <Post />
                    </div>
                </div>
            </div>
            <Logout />
        </div>
    )
}
