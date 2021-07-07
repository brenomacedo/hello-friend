import { prismaMock } from "../../utils/singleton"
import faker from 'faker'
import { createResponse } from "../../database/functions/responseFunctions"

describe('response', () => {

    const response = {
        id: faker.datatype.number(),
        authorId: faker.datatype.number(),
        commentId: faker.datatype.number(),
        content: faker.random.words()
    }

    it('should create a response', async () => {
        prismaMock.response.create.mockResolvedValue(response)

        await expect(createResponse(response, prismaMock)).resolves.toEqual(response)
    })
})
