import { Prisma, PrismaClient } from "@prisma/client"
import { prismaClient } from "../../utils/types"
import bcrypt from 'bcrypt'

interface CreateUser {
    name: string
    email: string
    type: string
    password: string
}

export async function createUser({ email, name, password, type }: CreateUser, prisma: prismaClient) {

    const user = await prisma.user.create({
        data: {
            type, email, password, name
        }
    })

    return user
}

interface CreateGitHubUser {
    name: string
    type: string
    avatar: string
    githubId: number
}

export async function createGitHubUser({ avatar, name, type, githubId }: CreateGitHubUser, prisma: prismaClient) {

    const user = await prisma.user.create({
        data: {
            name, type, avatar, githubId
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

    return user

}

interface FindUser {
    email: string
}

export async function findUser({ email }: FindUser, prisma: prismaClient) {

    const user = await prisma.user.findFirst({
        where: { email },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

    return user

}

interface FindUserById {
    id: number
}

export async function findUserById({ id }: FindUserById, prisma: prismaClient) {

    const user = await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

    return user

}

interface FindUserByGithubId {
    id: number
}

export async function findUserByGithubId({ id }: FindUserByGithubId, prisma: prismaClient) {

    const user = await prisma.user.findFirst({
        where: {
            githubId: id
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

    return user

}

interface EditUser {
    id: number
    data: {
        name?: string
        title?: string
        facebook?: string
        twitter?: string
        instagram?: string
        about?: string
    }
}

export async function editUser({ id, data }: EditUser, prisma: prismaClient) {

    const user = await prisma.user.update({
        where: {
            id
        },
        data
    })

    return user

}

interface DeleteUser {
    id: number
}

export async function deleteUser({ id }: DeleteUser, prisma: prismaClient) {

    const user = await prisma.user.delete({
        where: {
            id
        }
    })

    return user

}

interface UpdatePassword {
    id: number
    newPassword: string
    oldPassword: string
}

export async function updatePassword({ id, newPassword, oldPassword }: UpdatePassword, prisma: prismaClient) {

    const userToUpdate = await prisma.user.findFirst({
        where: {
            id
        }
    })

    if(!await bcrypt.compare(oldPassword, userToUpdate?.password || '')) {
        throw new Error('Incorrect password!')
    }

    const password = await bcrypt.hash(newPassword, 10)

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            password
        }
    })

    return user

}
