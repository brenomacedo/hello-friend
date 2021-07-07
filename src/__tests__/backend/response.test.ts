import { prismaMock } from "../../utils/singleton"
import faker from 'faker'
import { createResponse, deleteResponse, editResponse } from "../../database/functions/responseFunctions"

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

    it('should edit a response', async () => {
        prismaMock.response.findFirst.mockResolvedValue(response)
        prismaMock.response.update.mockResolvedValue(response)

        await expect(editResponse(response, prismaMock)).resolves.toEqual(response)
    })

    it('should delete a response', async () => {
        prismaMock.response.findFirst.mockResolvedValue(response)
        prismaMock.response.delete.mockResolvedValue(response)

        await expect(deleteResponse(response, prismaMock)).resolves.toEqual(response)
    })
})
