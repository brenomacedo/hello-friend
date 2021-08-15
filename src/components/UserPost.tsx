import styles from '../styles/post.module.scss'
import Image from 'next/image'
import { FaComment, FaHeart } from 'react-icons/fa'
import Button from './Button'
import { createRef, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { api } from '../services/api'
import NProgress from 'nprogress'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import ThrowAxiosErrors from '../utils/throwAxiosErrors'

interface UserPostProps {
    id: number
    description: string
    imageUrl: string | null
    createdAt: string
    deletePost: (postId: number) => void
}

export default function UserPost({ createdAt, description, id, imageUrl, deletePost }: UserPostProps) {

    const { user } = useAuth()

    const [currentDescription, setCurrentDescription] = useState(description)
    const [editDescription, setEditDescription] = useState(description)
    const [loading, setLoading] = useState(false)

    const [update, setUpdate] = useState(false)

    const toggleEdit = () => {
        setEditDescription(description)
        setUpdate(!update)
    }

    const handleEditPost = async () => {
        if(loading)
            return

        NProgress.start()
        setLoading(true)

        try {
            await api.put(`/post/${id}`, {
                description: editDescription
            })

            setCurrentDescription(editDescription)
            setUpdate(!update)

        } catch(e) {
            ThrowAxiosErrors(e)
        }

        NProgress.done()
        setLoading(false)
    }

    const handleDeletePost = async () => {
        if(loading)
            return

        NProgress.start()
        setLoading(true)

        try {
            await api.delete(`/post/${id}`, {
                data: {}
            })

            deletePost(id)
            toast.success('Post successfully deleted!')
        } catch(e) {
            const errors = e as AxiosError

            if(!errors.response)
                toast.error('An error ocurred editing your post, please try again.')
            else {
                errors.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }
        }

        NProgress.done()
        setLoading(false)
    }

    return (
        <div role='main' className={styles.container} style={{ flex: 1 }}>
            <div className={styles.author}>
                <div className={styles.profilePic}>
                    <Image src='https://avatars.githubusercontent.com/u/55261375?v=4'
                        width={48} height={48} />
                </div>
                <div className={styles.postInfo}>
                    <p>{user.name || ''}</p>
                    <span>{createdAt}</span>
                </div>
            </div>
            {update ? (
                <>
                    <textarea role='textbox' className={styles.editField} value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}></textarea>
                    <Button width='100%' onClick={handleEditPost} marginTop='0'>Save</Button>
                </>
            ) : (
                <p>{currentDescription}</p>
            )}
            {imageUrl && (<div className={styles.postImage}>
                <Image src='/postimage.jpg'  layout='fill' objectFit='contain' />
            </div>)}
            <div className={styles.editPost}>
                {update ? (
                    <Button onClick={toggleEdit}
                        width='100%' backgroundColor='#b388ff'>Cancel Edit</Button>
                ) : (
                    <Button onClick={toggleEdit}
                        width='100%' backgroundColor='#2196f3'>Edit</Button>
                )}
                <Button onClick={() => handleDeletePost()}
                    width='100%' backgroundColor='#f44336'>Delete</Button>
            </div>
        </div>
    )
}
