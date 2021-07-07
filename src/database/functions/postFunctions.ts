import { prismaClient } from "../../utils/types";

interface CreatePost {
    description: string
    imageUrl?: string
    categoryId: number
    userId: number
}

export async function createPost({ categoryId, description, userId, imageUrl }: CreatePost, prisma: prismaClient) {

    const post = await prisma.post.create({
        data: {
            description, categoryId, userId, imageUrl
        },
        include: {
            user: true
        }
    })

    return post

}

interface ListPosts {
    categoryId?: number
}

export async function listPosts({ categoryId }: ListPosts, prisma: prismaClient) {

    const posts = await prisma.post.findMany({
        where: {
            categoryId
        },
        include: {
            user: true,
            // comment: {
            //     include: response: true
            // }
        }
    })

    return posts

}

interface ListPostsByUser {
    userId: number
}

export async function listPostsByUser({ userId }: ListPostsByUser, prisma: prismaClient) {

    const posts = await prisma.post.findMany({
        where: { userId },
        include: {
            user: true
        }
    })

    return posts

}

interface EditPost {
    id: number
    description: string
}

export async function editPost({ id, description }: EditPost, prisma: prismaClient) {

    const post = await prisma.post.update({
        where: { id },
        data: { description }
    })

    return post

}

interface DeletePost {
    id: number
}

export async function deletePost({ id }: DeletePost, prisma: prismaClient) {
    const post = await prisma.post.delete({
        where: {
            id
        }
    })

    return post
}
