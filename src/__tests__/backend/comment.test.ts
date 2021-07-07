import faker from 'faker'
import { createComment } from '../../database/functions/commentFunctions'
import { prismaMock } from '../../utils/singleton'

describe('Comment', () => {

    const comment = {
        id: faker.datatype.number(),
        userId: faker.datatype.number(),
        postId: faker.datatype.number(),
        content: faker.random.words()
    }

    it('Should create a comment', async () => {

        prismaMock.comment.create.mockResolvedValue(comment)

        await expect(createComment({
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId
        }, prismaMock)).resolves.toEqual(comment)

    })

})
