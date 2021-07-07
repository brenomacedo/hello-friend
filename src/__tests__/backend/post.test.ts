import faker from 'faker'
import { createPost } from '../../database/functions/postFunctions'
import { prismaMock } from '../../utils/singleton'

describe('Posts', () => {

    const user = {
        id: 1,
        name: faker.name.findName(),
        type: 'email',
        email: faker.internet.email(),
        password: faker.internet.password(),
        title: null,
        about: null,
        facebook: null,
        instagram: null,
        twitter: null,
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
        githubId: null,
        avatar: null
    }

    const post = {
        id: faker.datatype.number(),
        description: faker.random.words(),
        categoryId: faker.datatype.number(),
        imageUrl: faker.image.cats(),
        userId: faker.datatype.number(),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
        user
    }

    it('should create a post', async () => {

        prismaMock.post.create.mockResolvedValue(post)

        await expect(createPost({ categoryId: post.categoryId,
            description: post.description,
            userId: post.userId,
            imageUrl: post.imageUrl }, prismaMock)).resolves.toEqual(post)

    })
})
