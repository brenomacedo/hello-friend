import { createContext, ReactNode, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { api } from "../services/api"
import { AxiosError } from "axios"
import { toast } from 'react-toastify'
import NProgress from 'nprogress'
import router from "next/router"

interface Category {
    id: number
    name: string
}

interface User {
    id: number
    type: 'email' | 'github' | ''
    name: string
    email?: string
    avatar?: string
    title?: string
    about?: string
    facebook?: string
    twitter?: string
    instagram?: string
    githubId?: number
    categories: Category[]
}

interface AuthProps {
    token: string
    loading: boolean
    isAuth?: boolean
    user: User
    setToken: (token: string) => void
    setLoading: (loading: boolean) => void
    setIsAuth: (isAuth: boolean) => void
    signUp: (name?: string, email?: string, password?: string, confirmPassword?: string) => void
    signIn: (remember: boolean, email?: string, password?: string) => void
    signInWithGithub: (code: string) => void
    updateUser: (name?: string, title?: string, about?: string, facebook?: string,
        twitter?: string, instagram?: string) => void
    updatePassword: (oldPassword?: string, password?: string, confirmPassword?: string) => void
    logout: () => void
    followCategory: (categoryId: number, name: string) => void
    unfollowCategory: (categoryId: number) => void
}

interface RegisterResponse {
    user: User
    token: string
}

interface AuthResponse {
    user: User
    token: string
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthProps>({} as any)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [token, _setToken] = useState('')
    const [loading, _setLoading] = useState(true)
    const [isAuth, _setIsAuth] = useState<boolean>()
    const [id, _setId] = useState(0)
    const [type, _setType] = useState<'email' | 'github' | ''>('')
    const [name, _setName] = useState('')
    const [email, _setEmail] = useState('')
    const [avatar, _setAvatar] = useState('')
    const [title, _setTitle] = useState('')
    const [about, _setAbout] = useState('')
    const [facebook, _setFacebook] = useState('')
    const [twitter, _setTwitter] = useState('')
    const [instagram, _setInstagram] = useState('')
    const [githubId, _setGithubId] = useState(0)
    const [categories, _setCategories] = useState<Category[]>([])

    const setToken = (token: string) => {
        _setToken(token)
    }

    const setLoading = (loading: boolean) => {
        _setLoading(loading)
    }

    const setIsAuth = (isAuth: boolean) => {
        _setIsAuth(isAuth)
    }

    const setId = (id: number) => {
        _setId(id)
    }

    const setType = (type: ('email' | 'github' | '')) => {
        _setType(type)
    }

    const setName = (name: string) => {
        _setName(name)
    }

    const setEmail = (email?: string) => {
        _setEmail(email || '')
    }

    const setAvatar = (avatar?: string) => {
        _setAvatar(avatar || '')
    }

    const setTitle = (title?: string) => {
        _setTitle(title || '')
    }

    const setAbout = (about?: string) => {
        _setAbout(about || '')
    }

    const setTwitter = (twitter?: string) => {
        _setTwitter(twitter || '')
    }

    const setFacebook = (facebook?: string) => {
        _setFacebook(facebook || '')
    }

    const setInstagram = (instagram?: string) => {
        _setInstagram(instagram || '')
    }

    const setGithubId = (githubId?: number) => {
        _setGithubId(githubId || 0)
    }

    const setCategories = (categories?: Category[]) => {
        _setCategories(categories || [])
    }

    const signUp = async (name?: string, email?: string, password?: string, confirmPassword?: string) => {

        if(loading)
            return

        let validationError = false

        if(!name) {
            validationError = true
            toast.error('The name is required!')
        }

        if(!email) {
            validationError = true
            toast.error('The email is required!')
        }

        if(!email?.match(/([A-Z]|[a-z])[\w_\.]+@([A-Z]|[a-z])+\.([A-Z]|[a-z])(\.([A-Z]|[a-z]))*/)) {
            validationError = true
            toast.error('The email format is invalid!')
        }

        if(!password) {
            validationError = true
            toast.error('The password is required!')
        }

        if(confirmPassword !== password) {
            validationError = true
            toast.error('The password and the confirmation password does not match!')
        }

        if(validationError)
            return

        NProgress.start()
        setLoading(true)

        try {

            const { data: { token, user } } = await api.post<RegisterResponse>('/user', {
                name, email, password, type: 'email'
            })

            api.defaults.headers.authorization = `Bearer ${token}`

            setId(user.id)
            setName(user.name)
            setEmail(user.email)
            setType('email')

            setIsAuth(true)
            setToken(token)

            toast.success('Account successfully created!')

            router.push('/profile')

        } catch(e) {
            const errors = e as AxiosError

            if(!errors.response)
                 toast.error('Unexpected error, please try again.')
            else {
                errors.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }

        }

        NProgress.done()
        setLoading(false)
    }

    const signIn = async (remember: boolean, email?: string, password?: string) => {

        if(loading)
            return

        let validationError = false

        if(!email) {
            validationError = true
            toast.error('The email is required!')
        }

        if(!email?.match(/([A-Z]|[a-z])[\w_\.]+@([A-Z]|[a-z])+\.([A-Z]|[a-z])(\.([A-Z]|[a-z]))*/)) {
            validationError = true
            toast.error('The email format is invalid!')
        }

        if(!password) {
            validationError = true
            toast.error('The password is required!')
        }

        if(validationError)
            return

        NProgress.start()
        setLoading(true)

        try {

            const { data: { token, user } } = await api.post<AuthResponse>('/auth', {
                email, password
            })

            api.defaults.headers.authorization = `Bearer ${token}`

            setId(user.id)
            setType(user.type)
            setName(user.name)
            setEmail(user.email)
            setTitle(user.title)
            setAbout(user.about)
            setAvatar(user.avatar)
            setFacebook(user.facebook)
            setInstagram(user.instagram)
            setTwitter(user.twitter)
            setCategories(user.categories)

            setToken(token)
            setIsAuth(true)

            if(remember)
                Cookies.set('token', token)

            toast.success('Successfully logged in!')
            router.push('/profile')

        } catch(e) {

            const error = e as AxiosError

            if(!error.response)
                toast.error('Unexpected error, please try again.')
            else {
                error.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }

        }

        NProgress.done()
        setLoading(false)

    }

    const signInWithGithub = async (code: string) => {

        NProgress.start()
        setLoading(true)

        try {
            const { data: { token, user } } = await api.post<AuthResponse>('/github/auth', { code })
            Cookies.set('token', token)

            api.defaults.headers.authorization = `Bearer ${token}`

            setId(user.id)
            setType(user.type)
            setName(user.name)
            setAvatar(user.avatar)
            setEmail(user.email)
            setTitle(user.title)
            setAbout(user.about)
            setFacebook(user.facebook)
            setInstagram(user.instagram)
            setTitle(user.twitter)
            setGithubId(user.githubId)
            setCategories(user.categories)

            setToken(token)
            setIsAuth(true)

            router.push('/profile')
            toast.success('Successfully logged in!')
        } catch {
            toast.error('Expired github session')
        }

        NProgress.done()
        setLoading(false)

    }

    const updateUser = async (name?: string, title?: string, about?: string,
        facebook?: string, twitter?: string, instagram?: string) => {

            if(!name) {
                toast.error('The name is required!')
                return
            }

            if(loading) {
                return
            }

            NProgress.start()
            setLoading(true)

            try {

                const { data: user } = await api.put<User>('/user', {
                    name, title, about, facebook, twitter, instagram
                })

                setName(user.name)
                setTitle(user.title)
                setAbout(user.about)
                setFacebook(user.facebook)
                setTwitter(user.twitter)
                setInstagram(user.instagram)

                toast.success('User successfully updated!')
            } catch(e) {
                const errors = e as AxiosError

                if(!errors.response)
                    toast.error('An unexpected error ocurred, please try again.')
                else {
                    errors.response.data.errors.forEach((error: string) => {
                        toast.error(error)
                    })
                }
            }

            NProgress.done()
            setLoading(false)

    }

    const updatePassword = async (oldPassword?: string, password?: string, confirmPassword?: string) => {

        if(!password) {
            return toast.error('The new password is required!')
        }

        if(password !== confirmPassword) {
            return toast.error('The new password and his confirmation does not match!')
        }

        NProgress.start()
        setLoading(true)

        try {
            await api.put('/auth', {
                password, oldPassword
            })

            toast.success('Password successfully updated!')
        } catch(e) {
            const error = e as AxiosError

            if(!error.response) {
                toast.error('An unexpected error ocurred, try again.')
            } else {
                error.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }
        }

        NProgress.done()
        setLoading(false)

    }

    const followCategory = async (categoryId: number, name: string) => {
        if(loading)
            return

        NProgress.start()
        setLoading(true)

        try {
            await api.post('/category', {
                categoryId
            })

            setCategories([...categories, {
                id: categoryId,
                name
            }])

            toast.success('Category followed successfull')
        } catch(e) {
            const errors = e as AxiosError

            if(!errors.response)
                toast.error('An error ocurred following this category, please try again')
            else {
                errors.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }
        }

        NProgress.done()
        setLoading(false)
    }

    const unfollowCategory = async (categoryId: number) => {

        if(loading)
            return

        NProgress.start()
        setLoading(true)

        try {
            await api.delete(`/category/${categoryId}`, {
                data: {}
            })

            setCategories(categories.filter(category => {
                return category.id !== categoryId
            }))

            toast.success('Category successfully unfollowed')
        } catch(e) {
            const errors = e as AxiosError

            if(!errors.response)
                return toast.error('An error ocurred unfollowing this category, please try again')
            else {
                errors.response.data.errors.forEach((error: string) => {
                    toast.error(error)
                })
            }
        }

        NProgress.done()
        setLoading(false)

    }

    const logout = () => {
        Cookies.set('token', '')
        api.defaults.headers.authorization = ''

        setToken('')
        setId(0)
        setType('')
        setName('')
        setEmail('')
        setAvatar('')
        setTitle('')
        setAbout('')
        setFacebook('')
        setTwitter('')
        setInstagram('')
        setGithubId(0)

        router.push('/')
        setIsAuth(false)
    }

    useEffect(() => {

        const verifyUser = async () => {

            const token = Cookies.get('token')

            if(token) {
                const { data: user } = await api.post<User>('/auth/verify', {}, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if(user) {

                    api.defaults.headers.authorization = `Bearer ${token}`

                    setToken(token)
                    setId(user.id)
                    setType(user.type)
                    setName(user.name)
                    setEmail(user.email || '')
                    setAvatar(user.avatar || '')
                    setTitle(user.title || '')
                    setAbout(user.about || '')
                    setFacebook(user.facebook || '')
                    setTwitter(user.twitter || '')
                    setInstagram(user.instagram || '')
                    setGithubId(user.githubId || 0)
                    setCategories(user.categories)

                    setIsAuth(true)
                    setLoading(false)

                } else {
                    setIsAuth(false)
                    setLoading(false)
                }

            } else {
                setIsAuth(false)
                setLoading(false)
            }

        }

        verifyUser()

    }, [])

    return (
        <AuthContext.Provider value={{
            loading,
            token,
            isAuth,
            user: {
                email,
                id,
                name,
                type,
                about,
                avatar,
                facebook,
                githubId,
                instagram,
                title,
                twitter,
                categories
            },
            setLoading,
            setToken,
            setIsAuth,
            signUp,
            signIn,
            signInWithGithub,
            updateUser,
            updatePassword,
            logout,
            followCategory,
            unfollowCategory
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}
