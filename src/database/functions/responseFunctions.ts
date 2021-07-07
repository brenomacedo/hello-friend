import { prismaClient } from "../../utils/types";

interface CreateResponse {
    authorId: number
    commentId: number
    content: string
}

export async function createResponse({ commentId, content, authorId }: CreateResponse, prisma: prismaClient) {

    const response = await prisma.response.create({
        data: {
            content, authorId, commentId
        }
    })

    return response

}
