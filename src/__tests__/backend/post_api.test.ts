import { createMocks } from "node-mocks-http"
import User from "../../pages/api/user"
import faker from 'faker'
import Post from "../../pages/api/post"
import prisma from '../../database/client'

describe('Post api', () => {

    afterEach(async () => {
        await prisma.post.deleteMany()
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should create a new post', async () => {

        const { req: userReq, res: userRes } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                type: 'email'
            }
        })

        await User(userReq, userRes)

        const { token } = userRes._getJSONData()

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                description: faker.random.words(),
                categoryId: 1,
                imageUrl: faker.image.cats()
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Post(req, res)

        expect(res._getStatusCode()).toBe(201)

    })

})
