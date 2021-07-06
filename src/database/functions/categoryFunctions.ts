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
