import styles from '../styles/writepost.module.scss'
import Image from 'next/image'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import { ChangeEvent, createRef, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface WritePostProps {
    handleCreatePost: (description: string, categoryId: number, image?: File) => Promise<void>
}

export default function WritePost({ handleCreatePost }: WritePostProps) {

    const { user } = useAuth()

    const [image, setImage] = useState<File>()

    const categoryRef = createRef<HTMLSelectElement>()
    const descriptionRef = createRef<HTMLTextAreaElement>()

    const renderOptions = () => {
        return user.categories.map(category => {
            return (
                <option value={category.id}>{category.name}</option>
            )
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(Number(categoryRef.current?.value) === 0) {
            toast.error('Select a category!')
            return
        }

        await handleCreatePost(
            descriptionRef.current?.value || '',
            Number(categoryRef.current?.value),
            image
        )

        descriptionRef.current?.setAttribute('value', '')
        categoryRef.current?.setAttribute('value', '0')
        clearImage()
    }

    const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files)
            return
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const clearImage = () => {
        setImage(undefined)
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.write}>
                <div className={styles.profilePic}>
                    <Image src={user.avatar || ''}
                        alt='breno' objectFit='cover' width={48} height={48} />
                </div>
                <textarea ref={descriptionRef}
                    placeholder='What is in your mind today, Breno?'></textarea>
            </div>
            <div className={styles.images}>
                <label htmlFor='file2' className={styles.addImage}>
                    <p>Add Image</p>
                </label>
                {image && (
                    <div className={styles.addImage} style={{
                        backgroundImage: `url('${URL.createObjectURL(image)}')`
                    }} onClick={clearImage}>
                    </div>
                )}
                <input type="file" hidden id='file2' onChange={changeFile} />
            </div>
            <div className={styles.submit}>
                <select ref={categoryRef} defaultValue={0} className={styles.select}>
                    <option value={0} disabled>Select the category</option>
                    {renderOptions()}
                </select>
                <Button width='12rem' marginTop='0'>
                    Share
                </Button>
            </div>
        </form>
    )
}
