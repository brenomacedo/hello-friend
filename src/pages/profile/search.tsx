import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import Button from '../../components/Button'
import styles from '../../styles/search.module.scss'
import { FiSearch } from 'react-icons/fi'
import Community from '../../components/Community'
import Head from 'next/head'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import router from 'next/router'
import Logout from '../../components/Logout'
import { ChangeEvent, createRef, FormEvent, useEffect, useState } from 'react'
import { api } from '../../services/api'

interface Category {
    id: number
    name: string
}

export default function Search() {

    const { isAuth, user } = useAuth()
    const [categories, setCategories] = useState<Category[]>([])

    if(isAuth === undefined)
        return <Loading />
    else if(!isAuth) {
        router.push('/login')
        return false
    }

    const searchRef = createRef<HTMLInputElement>()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const { data: categories } = await api.get<Category[]>(`/category?search=${searchRef.current?.value}`)

        setCategories(categories)
    }

    const renderCommunities = () => {
        return categories.map(category => {
            return (
                <Community active={user.categories.some(userCategory => {
                    return userCategory.id === category.id
                })} src={`/${category.name.toLowerCase()}.png`} name={category.name}
                    label={category.name} categoryId={category.id} />
            )
        })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Friend - Search</title>
            </Head>
            <TopBar active='search' />
            <div className={styles.searchBoxContainer}>
                <div className={styles.searchBox}>
                    <form onSubmit={handleSubmit} className={styles.searchBar}>
                        <Input marginTop='0' width='100%' Icon={FiSearch} ref={searchRef}
                            containerFlex='1' placeholder='Search a community' />
                        <Button width='3rem' marginTop='0'>
                            Go!
                        </Button>
                    </form>
                    <div className={styles.communities}>
                        {renderCommunities()}
                        {categories.length === 0 && (
                            <div className={styles.zaroCategories}>
                                <p>Search a category to follow</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Logout />
        </div>
    )
}
