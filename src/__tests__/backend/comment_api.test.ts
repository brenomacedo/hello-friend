import prisma from '../../database/client'
import faker from 'faker'
import { createMocks } from 'node-mocks-http'
import User from '../../pages/api/user'
import Post from '../../pages/api/post'
import Comment from '../../pages/api/comment'

describe('comment api', () => {

    afterEach(async () => {
        await prisma.comment.deleteMany()
        await prisma.post.deleteMany()
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should create an comment', async () => {

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

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                postId,
                content: faker.random.words()
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Comment(req, res)

        expect(res._getStatusCode()).toBe(201)

    })

    it('should edit an comment', async () => {

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

        const { req, res } = createMocks({
            method: 'PUT',
            body: {
                content: faker.random.words()
            },
            query: {
                commentId
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Comment(req, res)


    })

    it('should edit an comment', async () => {

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

        const { id } = commentRes._getJSONData()

        const { req, res } = createMocks({
            method: 'PUT',
            body: {
                content: faker.random.words()
            },
            query: {
                id
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Comment(req, res)

        expect(res._getStatusCode()).toBe(200)


    })

    it('should edit an comment', async () => {

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

        const { id } = commentRes._getJSONData()

        const { req, res } = createMocks({
            method: 'DELETE',
            query: {
                id
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Comment(req, res)

        expect(res._getStatusCode()).toBe(200)


    })



})
