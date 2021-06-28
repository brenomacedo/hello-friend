import styles from '../../styles/edit.module.scss'
import TopBar from "../../components/TopBar"
import Image from 'next/image'
import Button from '../../components/Button'
import InfoInput from '../../components/InfoInput'
import { FiMail, FiUser } from 'react-icons/fi'

export default function Edit() {
    return (
        <div className={styles.container}>
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
                        <InfoInput label='E-mail' Icon={FiMail} width='100%'/>
                        <InfoInput label='Title' Icon={FiMail} width='100%'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
