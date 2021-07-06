import { followUserCategory, seedCategories, unfollowUserCategory } from "../../database/functions/categoryFunctions"
import { prismaMock } from "../../utils/singleton"
import faker from 'faker'

describe('categories', () => {

    it('should seed the categirues', async () => {
        const categories = [
            { name: 'Sports' },
            { name: 'Games' },
            { name: 'Series' }
        ]

        const count = {
            count: categories.length
        }

        prismaMock.category.createMany.mockResolvedValue(count)

        await expect(seedCategories({ categories }, prismaMock)).resolves.toEqual(count)
    })

    it('should follow an category', async () => {

        const userId = faker.datatype.number()
        const categoryId = faker.datatype.number()

        const relation = {
            userId,
            categoryId,
            createdAt: faker.datatype.datetime()
        }

        prismaMock.categoriesOnUser.create.mockResolvedValue(relation)

        await expect(followUserCategory({ categoryId, userId }, prismaMock)).resolves.toEqual(relation)

    })

    it('should unfollow an category', async () => {

        const userId = faker.datatype.number()
        const categoryId = faker.datatype.number()

        const relation = {
            userId,
            categoryId,
            createdAt: faker.datatype.datetime()
        }

        prismaMock.categoriesOnUser.delete.mockResolvedValue(relation)

        await expect(unfollowUserCategory({ categoryId, userId }, prismaMock)).resolves.toEqual(relation)

    })

})
