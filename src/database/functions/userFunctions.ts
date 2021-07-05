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

export async function findUser({ email }: FindUser, prisma: prismaClient){

    const user = await prisma.user.findFirst({
        where: { email }
    })

    return user

}
