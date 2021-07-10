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
            comments: {
                include: {
                    responses: {
                        include: {
                            author: true
                        }
                    },
                    author: true
                }
            }
        },
        orderBy: {
            id: 'desc'
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
        orderBy: {
            id: 'desc'
        }
    })

    return posts

}

interface EditPost {
    id: number
    userId: number
    description: string
}

export async function editPost({ id, description, userId }: EditPost, prisma: prismaClient) {

    const postToEdit = await prisma.post.findFirst({
        where: { id }
    })

    if(postToEdit?.userId !== userId) {
        throw new Error('This post is not yours')
    }

    const post = await prisma.post.update({
        where: { id },
        data: { description }
    })

    return post

}

interface DeletePost {
    id: number
    userId: number
}

export async function deletePost({ id, userId }: DeletePost, prisma: prismaClient) {

    const postToDelete = await prisma.post.findFirst({
        where: {
            id
        }
    })

    if(postToDelete?.userId !== userId) {
        throw new Error('This post is not yours')
    }

    const post = await prisma.post.delete({
        where: {
            id
        }
    })

    return post
}
