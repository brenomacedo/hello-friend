import { prismaClient } from "../../utils/types";

interface SeedCategories {
    categories: {
        name: string
    }[]
}

export async function seedCategories({ categories }: SeedCategories, prisma: prismaClient) {

    const seededCategories = await prisma.category.createMany({
        data: categories
    })

    return seededCategories

}

interface FollowUserCategory {
    userId: number
    categoryId: number
}

export async function followUserCategory({ categoryId, userId }: FollowUserCategory, prisma: prismaClient) {

    const relation = await prisma.categoriesOnUser.create({
        data: {
            categoryId, userId
        }
    })

    return relation

}

interface UnfollowUserCategory {
    userId: number
    categoryId: number
}

export async function unfollowUserCategory({ categoryId, userId }: UnfollowUserCategory, prisma: prismaClient) {

    const relation = await prisma.categoriesOnUser.delete({
        where: {
            userId_categoryId: {
                categoryId, userId
            }
        }
    })

    return relation

}
