import styles from '../../styles/edit.module.scss'
import TopBar from "../../components/TopBar"
import Image from 'next/image'
import Button from '../../components/Button'
import PasswordInput from '../../components/PasswordInput'
import InfoInput from '../../components/InfoInput'
import { FiLock, FiMail, FiUser } from 'react-icons/fi'
import Head from 'next/head'

export default function Edit() {
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
                        <Image src="https://avatars.githubusercontent.com/u/55261375?v=4" alt="breno"
                            objectFit="cover" width={72} height={72} />
                    </div>
                    <h3>Breno Macêdo</h3>
                    <h4>Programador</h4>

                    <div className={styles.postCount}>
                        <p>1.5k</p>
                        <span>posts</span>
                    </div>

                    <Button width='10rem'>
                        Upload new avatar
                    </Button>

                    <Button width='10rem' backgroundColor='#2196f3'>
                        See my posts
                    </Button>

                    <div className={styles.bio}>
                        <h3>About me</h3>
                        <p>Oi! sou um programador full stack e esse é um projeto pessoal que eu estou desenvolvendo! Espero que goste!</p>
                    </div>

                </div>
                <div className={styles.editProfile}>
                    <div className={styles.basicInfo}>
                        <h2>Basic info</h2>
                        <Button width='8rem' marginTop='0'>
                            Save
                        </Button>
                    </div>
                    <div className={styles.basicInfoFields}>
                        <InfoInput label='Name' Icon={FiUser} width='100%'/>
                        <InfoInput label='Title' Icon={FiMail} width='100%'/>
                    </div>
                    <div className={styles.specificInfo}>
                        <h2>Specific information</h2>
                    </div>
                    <div className={styles.specificInfoFields}>
                        <p>About you</p>
                        <textarea className={styles.textarea} placeholder='Enter something about you'>

                        </textarea>
                    </div>
                    <div className={styles.specificInfo}>
                        <h2>External Links</h2>
                    </div>
                    <div className={styles.specificInfoFields}>
                        <InfoInput label='Facebook URL' Icon={FiUser} width='100%'/>
                        <InfoInput label='Twitter URL' Icon={FiMail} width='100%'/>
                        <InfoInput label='Instagram URL' Icon={FiMail} width='100%'/>
                    </div>
                    <div className={styles.specificInfo}>
                        <h2>Security</h2>
                    </div>
                    <div className={styles.specificInfoFields}>
                        <p>Update password</p>
                        <PasswordInput placeholder='Enter your current password' Icon={FiLock} width='100%'/>
                        <PasswordInput placeholder='Enter your new password' Icon={FiLock} width='100%' />
                        <PasswordInput placeholder='Confirm your new password' Icon={FiLock}
                            width='100%' toggleEye={false} />

                        <div className={styles.updatePassword}>
                            <Button width='15rem'>Update Password</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
