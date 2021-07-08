import { createContext, ReactNode, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { api } from "../services/api"

interface User {
    id: number
    type: 'email' | 'github' | ''
    name: string
    email: string
    avatar?: string
    title?: string
    about?: string
    facebook?: string
    twitter?: string
    instagram?: string
    githubId?: number
}

interface AuthProps {
    token: string
    loading: boolean
    isAuth: boolean
    user: User
    setToken: (token: string) => void
    setLoading: (loading: boolean) => void
    setIsAuth: (isAuth: boolean) => void
    setId: (id: number) => void
    setType: (type: ('email' | 'github' | '')) => void
    setName: (name: string) => void
    setEmail: (email: string) => void
    setAvatar: (avatar: string) => void
    setTitle: (title: string) => void
    setAbout: (about: string) => void
    setFacebook: (facebook: string) => void
    setInstagram: (instagram: string) => void
    setTwitter: (twitter: string) => void
    setGithubId: (githubId: number) => void
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthProps>({} as any)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [token, _setToken] = useState('')
    const [loading, _setLoading] = useState(true)
    const [isAuth, _setIsAuth] = useState(false)
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

    const setEmail = (email: string) => {
        _setEmail(email)
    }

    const setAvatar = (avatar: string) => {
        _setAvatar(avatar)
    }

    const setTitle = (title: string) => {
        _setTitle(title)
    }

    const setAbout = (about: string) => {
        _setAbout(about)
    }

    const setTwitter = (twitter: string) => {
        _setTwitter(twitter)
    }

    const setFacebook = (facebook: string) => {
        _setFacebook(facebook)
    }

    const setInstagram = (instagram: string) => {
        _setInstagram(instagram)
    }

    const setGithubId = (githubId: number) => {
        _setGithubId(githubId)
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
                twitter
            },
            setAbout,
            setAvatar,
            setEmail,
            setFacebook,
            setGithubId,
            setId,
            setInstagram,
            setLoading,
            setName,
            setTitle,
            setToken,
            setTwitter,
            setType,
            setIsAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}
