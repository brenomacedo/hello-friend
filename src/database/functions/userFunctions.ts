import { Prisma, PrismaClient } from "@prisma/client"

interface CreateUser {
    name: string
    email: string
    type: string
    password: string
}

export async function createUser({ email, name, password, type }: CreateUser,
    prisma: PrismaClient<Prisma.PrismaClientOptions, never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>) {

    const user = await prisma.user.create({
        data: {
            type, email, password, name
        }
    })

    return user
}
