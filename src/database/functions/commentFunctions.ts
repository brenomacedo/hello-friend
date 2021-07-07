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
