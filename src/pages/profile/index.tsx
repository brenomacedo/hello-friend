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
import { GetServerSideProps } from 'next'
import client from '../../database/client'
import { RenderPosts } from '../../database/views/PostView'

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

interface ProfileProps {
    posts: PostWithUser[]
}

export default function Profile({ posts }: ProfileProps) {

    const { isAuth } = useAuth()

    if(isAuth === undefined)
        return <Loading />
    else if(!isAuth) {
        router.push('/login')
        return false
    }

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <Post key={post.id} {...post} />
            )
        })
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
                        {renderPosts()}
                    </div>
                </div>
            </div>
            <Logout />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {

    const posts = await client.post.findMany({
        include: {
            user: true,
            comments: {
                include: {
                    author: true,
                    responses: {
                        include: {
                            author: true
                        }
                    }
                }
            }
        }
    })

    await client.$disconnect()

    return {
        props: {
            posts: RenderPosts(posts)
        }
    }
}
