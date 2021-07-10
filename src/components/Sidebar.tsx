import SidebarTile from '../components/SidebarTile'
import styles from '../styles/sidebar.module.scss'

interface Category {
    id: number
    name: string
}

interface SidebarProps {
    selected: number
    setCategory: (categoryId: number) => void
    categories: Category[]
}

export default function Sidebar({ selected, categories, setCategory }: SidebarProps) {

    const renderCategories = () => {
        return categories.map(category => {
            return (
                <SidebarTile key={category.id} label={category.name} selected={selected === category.id}
                    src={`/${category.name.toLowerCase()}.png`} onClick={() => setCategory(category.id)} />
            )
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.title}>
                    <p>Favourites</p>
                </div>
                <SidebarTile onClick={() => setCategory(0)} label='All'
                src='/logo-only-text.png' selected={selected === 0} />
                {renderCategories()}
                {categories.length === 0 && (
                    <div className={styles.zeroCategories}>
                        <p>You are not following any categories yet :(</p>
                    </div>
                )}
            </div>
        </div>
    )
}
