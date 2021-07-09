import styles from '../../styles/seeposts.module.scss'
import TopBar from '../../components/TopBar'
import UserPost from '../../components/UserPost'
import Head from 'next/head'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import router from 'next/router'
import Logout from '../../components/Logout'

export default function SeePosts() {

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
            <Logout />
        </div>
    )
}
