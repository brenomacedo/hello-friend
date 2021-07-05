import { Prisma, PrismaClient } from "@prisma/client"

export type prismaClient = PrismaClient<Prisma.PrismaClientOptions, never,
Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
