import { seedCategories } from "../../database/functions/categoryFunctions"
import { prismaMock } from "../../utils/singleton"

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

})
