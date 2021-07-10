import styles from '../../styles/seeposts.module.scss'
import TopBar from '../../components/TopBar'
import UserPost from '../../components/UserPost'
import Head from 'next/head'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import router from 'next/router'
import Logout from '../../components/Logout'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

type Post = {
    id: number
    description: string
    imageUrl: string | null
    createdAt: string
    updatedAt: string
}

export default function SeePosts() {

    const { isAuth } = useAuth()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {

        if(isAuth) {

            const getPosts = async () => {
                const { data: posts } = await api.get<Post[]>('/user/post', {
                    data: {}
                })
                setPosts(posts)
            }

            getPosts()
        }

    }, [isAuth])

    if(isAuth === undefined)
        return <Loading />
    else if(!isAuth) {
        router.push('/login')
        return false
    }

    const deletePost = (postId: number) => {
        setPosts(posts.filter(post => {
            return post.id !== postId
        }))
    }

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <UserPost createdAt={post.createdAt} description={post.description}
                    id={post.id} imageUrl={post.imageUrl} deletePost={deletePost} key={post.id} />
            )
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - See Posts</title>
            </Head>
            <TopBar active='edit' />
            <div className={styles.postListContainer}>
                <div className={styles.postList}>
                    {renderPosts()}
                </div>
            </div>
            <Logout />
        </div>
    )
}
