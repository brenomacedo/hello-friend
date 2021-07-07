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

interface EditResponse {
    authorId: number
    id: number
    content: string
}


export async function editResponse({ authorId, content, id }: EditResponse, prisma: prismaClient) {

    const responseToEdit = await prisma.response.findFirst({
        where: {
            id
        }
    })

    if(responseToEdit?.authorId !== authorId) {
        throw new Error('This response is not yours!')
    }

    const response = await prisma.response.update({
        where: {
            id
        },
        data: {
            content
        }
    })

    return response

}

interface DeleteResponse {
    id: number
    authorId: number
}

export async function deleteResponse({ authorId, id }: DeleteResponse, prisma: prismaClient) {

    const responseToDelete = await prisma.response.findFirst({
        where: {
            id
        }
    })

    if(responseToDelete?.authorId !== authorId) {
        throw new Error('This response is not yours')
    }

    const response = await prisma.response.delete({
        where: {
            id
        }
    })

    return response

}
