import { Prisma, PrismaClient } from "@prisma/client"
import { prismaClient } from "../../utils/types"

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

interface FindUser {
    email: string
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
        }
    })

    return user

}

export async function findUser({ email }: FindUser, prisma: prismaClient) {

    const user = await prisma.user.findFirst({
        where: { email }
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