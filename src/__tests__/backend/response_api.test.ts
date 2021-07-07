import { createMocks } from "node-mocks-http"
import Post from "../../pages/api/post"
import User from "../../pages/api/user"
import faker from 'faker'
import Comment from "../../pages/api/comment"
import Response from "../../pages/api/response"
import prisma from '../../database/client'

describe('response api', () => {

    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should create a response', async () => {
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

        const { req: postReq, res: postRes } = createMocks({
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

        await Post(postReq, postRes)

        const { id: postId } = postRes._getJSONData()

        const { req: commentReq, res: commentRes } = createMocks({
            method: 'POST',
            body: {
                postId,
                content: faker.random.words()
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Comment(commentReq, commentRes)

        const { id: commentId } = commentRes._getJSONData()

        console.log(commentId)

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                commentId,
                content: faker.random.words()
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Response(req, res)

        expect(res._getStatusCode()).toBe(201)
    })

})
