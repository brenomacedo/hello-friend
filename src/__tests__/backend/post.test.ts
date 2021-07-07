import faker from 'faker'
import { createPost, deletePost, editPost, listPosts, listPostsByUser } from '../../database/functions/postFunctions'
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

    it('should list posts', async () => {

        prismaMock.post.findMany.mockResolvedValue([post])

        await expect(listPosts({ categoryId: 1 }, prismaMock)).resolves.toEqual([post])

    })

    it('should list posts by user', async () => {

        prismaMock.post.findMany.mockResolvedValue([post])

        await expect(listPostsByUser({ userId: faker.datatype.number() }, prismaMock))
            .resolves.toEqual([post])

    })

    it('should edit an post', async () => {

        prismaMock.post.update.mockResolvedValue(post)

        await expect(editPost({ id: faker.datatype.number()
            ,description: faker.random.words() }, prismaMock))
            .resolves.toEqual(post)

    })

    it('should delete an post', async () => {

        prismaMock.post.delete.mockResolvedValue(post)

        await expect(deletePost({ id: faker.datatype.number() }, prismaMock))
            .resolves.toEqual(post)

    })
})
