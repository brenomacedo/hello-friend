import { createMocks } from "node-mocks-http"
import faker from 'faker'
import User from "../../pages/api/user"
import Category from "../../pages/api/category"
import prisma from '../../database/client'

describe('category api', () => {

    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should make an user follow an category', async () => {

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
                categoryId: 1
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Category(req, res)

        expect(res._getStatusCode()).toBe(201)

    })

    it('should make an user follow an category', async () => {

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

        const { req: followReq, res: followRes } = createMocks({
            method: 'POST',
            body: {
                categoryId: 1
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Category(followReq, followRes)

        const { req, res } = createMocks({
            method: 'DELETE',
            body: {
                categoryId: 1
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Category(req, res)

        expect(res._getStatusCode()).toBe(200)

    })

})
