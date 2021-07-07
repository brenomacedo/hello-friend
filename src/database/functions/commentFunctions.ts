import { prismaClient } from "../../utils/types";

interface CreateComment {
    userId: number
    postId: number
    content: string
}

export async function createComment({ content, postId, userId }: CreateComment, prisma: prismaClient) {

    const comment = await prisma.comment.create({
        data: {
            content, userId, postId
        }
    })

    return comment

}

interface EditComment {
    userId: number,
    id: number,
    content: string
}

export async function editComment({ userId, content, id }: EditComment, prisma: prismaClient) {

    const commentToEdit = await prisma.comment.findFirst({
        where: { id }
    })

    if(commentToEdit?.userId !== userId) {
        throw new Error('This comment is not yours')
    }

    const comment = await prisma.comment.update({
        where: { id },
        data: {
            content
        }
    })

    return comment

}

interface DeleteComment {
    userId: number
    id: number
}

export async function deleteComment({ id, userId }: DeleteComment, prisma: prismaClient) {

    const commentToDelete = await prisma.comment.findFirst({
        where: {
            id
        }
    })

    if(commentToDelete?.userId !== userId) {
        throw new Error('This comment is not yours')
    }

    const comment = await prisma.comment.delete({
        where: {
            id
        }
    })

    return comment

}
