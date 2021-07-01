import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import styles from '../../styles/search.module.scss'
import { FiSearch } from 'react-icons/fi'
import Community from '../../components/Community'
import Head from 'next/head'

export default function Search() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Search</title>
            </Head>
            <TopBar active='search' />
            <div className={styles.searchBoxContainer}>
                <div className={styles.searchBox}>
                    <div className={styles.searchBar}>
                        <Input marginTop='0' width='100%' Icon={FiSearch}
                            containerFlex='1' placeholder='Search a community' />
                        <Button width='3rem' marginTop='0'>
                            Go!
                        </Button>
                    </div>
                    <div className={styles.communities}>
                        <Community active src='/games.png' label='Games' />
                        <Community active src='/series.png' label='Series' />
                        <Community active src='/films.png' label='Movies' />
                    </div>
                </div>
            </div>
        </div>
    )
}
