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
