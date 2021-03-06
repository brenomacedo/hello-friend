import { createMocks } from 'node-mocks-http'
import User from '../../pages/api/user'
import prisma from '../../database/client'
import faker from 'faker'
import Auth from '../../pages/api/auth'

describe('user api', () => {

    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    it('should create a new user', async () => {

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                type: 'email'
            }
        })

        await User(req, res)

        expect(res._getStatusCode()).toBe(201)

    })

    it('should edit a new user', async () => {

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
            method: 'PUT',
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                type: 'email'
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await User(req, res)

        expect(res._getStatusCode()).toBe(200)

    })

    it('should delete an user', async () => {
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
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await User(req, res)

        expect(res._getStatusCode()).toBe(200)
    })

    it('should update an user password', async () => {

        const password = faker.internet.password()

        const { req: userReq, res: userRes } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password,
                type: 'email'
            }
        })

        await User(userReq, userRes)

        const { token } = userRes._getJSONData()

        const { req, res } = createMocks({
            method: 'PUT',
            body: {
                password: faker.internet.password(),
                oldPassword: password
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        await Auth(req, res)

        expect(res._getStatusCode()).toBe(200)
    })

})
