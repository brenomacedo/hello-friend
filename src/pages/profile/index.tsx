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
import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import NProgress from 'nprogress'
import ThrowAxiosErrors from '../../utils/throwAxiosErrors'

type CreatedPost = {
    id: number
    description: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

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
            commentId: number
            authorId: number
            author: Author
        }[]
    }[]
}

interface ProfileProps {
    posts: PostWithUser[]
}

export default function Profile({ posts: initialPosts }: ProfileProps) {

    const { isAuth, user } = useAuth()

    const [posts, setPosts] = useState(initialPosts)
    const [selectedCategory, setSelectedCategory] = useState<number>(0)
    const [loading, setLoading] = useState(false)

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

    const handleSetSelectedCategory = async (newCategoryId: number) => {
        if(newCategoryId === selectedCategory || loading)
            return

        setLoading(true)

        const { data: posts } = await api.get<PostWithUser[]>(`/post?categoryId=${newCategoryId}`)
        setPosts(posts)

        setSelectedCategory(newCategoryId)
        setLoading(false)
    }

    const handleCreatePost = async (description: string, categoryId: number, image?: File) => {

        if(loading)
            return

        NProgress.start()
        setLoading(true)

        try {
            if(!image) {
                const { data: newPost } = await api.post<CreatedPost>('/post', {
                    description, categoryId
                })

                if(categoryId === selectedCategory || selectedCategory === 0)
                    setPosts([{
                        ...newPost,
                        user: {
                            about: user.about || '',
                            avatar: user.avatar || '',
                            email: user.email || '',
                            facebook: user.facebook || '',
                            githubId: user.githubId || 0,
                            id: user.id,
                            instagram: user.instagram || '',
                            name: user.name || '',
                            title: user.title || '',
                            twitter: user.twitter || '',
                            type: user.type
                        },
                        comments: []
                    },...posts])
            } else {
                const data = new FormData()
                data.append('categoryId', String(categoryId))
                data.append('description', description)
                data.append('image', image)

                const { data: newPost } = await api.post<CreatedPost>('/post/image', data)

                if(categoryId === selectedCategory || selectedCategory === 0)
                    setPosts([{
                        ...newPost,
                        user: {
                            about: user.about || '',
                            avatar: user.avatar || '',
                            email: user.email || '',
                            facebook: user.facebook || '',
                            githubId: user.githubId || 0,
                            id: user.id,
                            instagram: user.instagram || '',
                            name: user.name || '',
                            title: user.title || '',
                            twitter: user.twitter || '',
                            type: user.type
                        },
                        comments: []
                    },...posts])
            }

            toast.success('Successfully created post!')

        } catch(e) {
            ThrowAxiosErrors(e)
        }

        NProgress.done()
        setLoading(false)

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Profile</title>
            </Head>
            <TopBar active='home' />
            <div className={styles.home}>
                <div className={styles.content}>
                    <Sidebar selected={selectedCategory} categories={user.categories} setCategory={handleSetSelectedCategory} />
                    <div className={styles.feed}>
                        <WritePost handleCreatePost={handleCreatePost} />
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
        },
        orderBy: {
            id: 'desc'
        }
    })

    await client.$disconnect()

    return {
        props: {
            posts: RenderPosts(posts)
        }
    }
}
