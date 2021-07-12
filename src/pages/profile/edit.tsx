import styles from '../../styles/edit.module.scss'
import TopBar from "../../components/TopBar"
import Image from 'next/image'
import Button from '../../components/Button'
import PasswordInput from '../../components/PasswordInput'
import InfoInput from '../../components/InfoInput'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import Head from 'next/head'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import router from 'next/router'
import { createRef, FormEvent, useEffect } from 'react'
import Logout from '../../components/Logout'
import { api } from '../../services/api'
import imgg from '../../../uploads/profile/3f54a32f2e926e09d7c3-1E98ph8.jpeg'

export default function Edit() {

    const { isAuth, user, updateUser, updatePassword, updateAvatar } = useAuth()

    useEffect(() => {

        if(isAuth) {
            nameRef.current?.setAttribute('value', user.name)
            titleRef.current?.setAttribute('value', user.title || '')
            aboutRef.current?.setAttribute('value', user.about || '')
            facebookRef.current?.setAttribute('value', user.facebook || '')
            twitterRef.current?.setAttribute('value', user.twitter || '')
            instagramRef.current?.setAttribute('value', user.instagram || '')
        }

    }, [isAuth])

    if(isAuth === undefined)
        return <Loading />
    else if(!isAuth) {
        router.push('/login')
        return false
    }

    const nameRef = createRef<HTMLInputElement>()
    const titleRef = createRef<HTMLInputElement>()
    const aboutRef = createRef<HTMLTextAreaElement>()
    const facebookRef = createRef<HTMLInputElement>()
    const twitterRef = createRef<HTMLInputElement>()
    const instagramRef = createRef<HTMLInputElement>()
    const oldPasswordRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const confirmPasswordRef = createRef<HTMLInputElement>()

    const handleUpdate = () => {

        updateUser(
            nameRef.current?.value,
            titleRef.current?.value,
            aboutRef.current?.value,
            facebookRef.current?.value,
            twitterRef.current?.value,
            instagramRef.current?.value,
        )

    }

    const handleUpdatePassword = () => {

        updatePassword(
            oldPasswordRef.current?.value,
            passwordRef.current?.value,
            confirmPasswordRef.current?.value
        )

        oldPasswordRef.current?.setAttribute('value', '')
        passwordRef.current?.setAttribute('value', '')
        confirmPasswordRef.current?.setAttribute('value', '')

    }

    const navigateToSeeMyPosts = () => {
        router.push('/profile/see-posts')
    }

    const changeImage = async (e: FormEvent<HTMLInputElement>) => {
        if(!e.currentTarget.files)
            return

        updateAvatar(e.currentTarget.files[0])

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Edit profile</title>
            </Head>
            <TopBar active='edit' />
            <div className={styles.title}>
                <h2>Settings</h2>
            </div>
            <div className={styles.edit}>
                <div className={styles.profile}>
                    <p>Profile</p>
                    <div className={styles.profilePic}>
                        <Image src={user.avatar || ''} alt="breno"
                            objectFit="cover" width={72} height={72} />
                    </div>
                    <h3>{user.name}</h3>
                    <h4>{user.title}</h4>

                    <div className={styles.postCount}>
                        <p>1.5k</p>
                        <span>posts</span>
                    </div>

                    <label className={styles.label} htmlFor='file'>
                            Upload new avatar
                    </label>

                    <input type='file' multiple={false} id='file' hidden onChange={changeImage} />

                    <Button width='10rem' backgroundColor='#2196f3' onClick={navigateToSeeMyPosts}>
                        See my posts
                    </Button>

                    <div className={styles.bio}>
                        <h3>About me</h3>
                        <p>{user.about || 'Nothing :('}</p>
                    </div>

                </div>
                <div className={styles.editProfile}>
                    <div className={styles.basicInfo}>
                        <h2>Basic info</h2>
                        <Button width='8rem' marginTop='0' onClick={handleUpdate}>
                            Save
                        </Button>
                    </div>
                    <div className={styles.basicInfoFields}>
                        <InfoInput label='Name' ref={nameRef}
                            Icon={FiUser} width='100%'/>
                        <InfoInput label='Title' ref={titleRef}
                        Icon={FiMail} width='100%'/>
                    </div>
                    <div className={styles.specificInfo}>
                        <h2>Specific information</h2>
                    </div>
                    <div className={styles.specificInfoFields}>
                        <p>About you</p>
                        <textarea className={styles.textarea} ref={aboutRef}
                            placeholder='Enter something about you'>

                        </textarea>
                    </div>
                    <div className={styles.specificInfo}>
                        <h2>External Links</h2>
                    </div>
                    <div className={styles.specificInfoFields}>
                        <InfoInput label='Facebook URL' ref={facebookRef}
                            Icon={FiUser} width='100%'/>
                        <InfoInput label='Twitter URL' ref={twitterRef}
                            Icon={FiMail} width='100%'/>
                        <InfoInput label='Instagram URL' ref={instagramRef}
                            Icon={FiMail} width='100%'/>
                    </div>
                    {user.type === 'email' && (
                        <>
                        <div className={styles.specificInfo}>
                            <h2>Security</h2>
                        </div>
                        <div className={styles.specificInfoFields}>
                            <p>Update password</p>
                            <PasswordInput placeholder='Enter your current password' ref={oldPasswordRef}
                                Icon={FiLock} width='100%'/>
                            <PasswordInput placeholder='Enter your new password' ref={passwordRef}
                                Icon={FiLock} width='100%' />
                            <PasswordInput placeholder='Confirm your new password' ref={oldPasswordRef}
                                Icon={FiLock}
                                width='100%' toggleEye={false} />

                            <div className={styles.updatePassword}>
                                <Button width='15rem' onClick={handleUpdatePassword}
                                    >Update Password</Button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
            <Logout />
        </div>
    )
}
