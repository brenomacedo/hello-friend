import { createMocks } from 'node-mocks-http'
import faker from 'faker'
import prisma from '../../database/client'
import Register from '../../pages/api/user'
import Auth from '../../pages/api/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import AuthMiddleware from '../../database/middlewares/auth'

describe('authentication', () => {

    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        // setImmediate is not defined (ignore that)
        await prisma.$disconnect()
    })

    it('should return an user if the email and the password are correct!', async () => {

        const email = faker.internet.email()
        const password = faker.internet.password()

        const { req: registerReq, res: registerRes } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email,
                password,
                type: 'email'
            }
        })

        await Register(registerReq, registerRes)

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email, password
            }
        })

        await Auth(req, res)

        expect(res._getStatusCode()).toBe(200)

    })

    it('should give an error if the password is incorrect', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        const { req: registerReq, res: registerRes } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email,
                password,
                type: 'email'
            }
        })

        await Register(registerReq, registerRes)

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email, password: faker.random.alphaNumeric()
            }
        })

        await Auth(req, res)

        expect(res._getStatusCode()).toBe(401)
    })

    it('should return an error if the user does not exist', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email, password
            }
        })

        await Auth(req, res)

        expect(res._getStatusCode()).toBe(404)
    })

    it('should return an error if the token is not provided', async () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        const { req: registerReq, res: registerRes } = createMocks({
            method: 'POST',
            body: {
                name: faker.name.findName(),
                email,
                password,
                type: 'email'
            }
        })

        await Register(registerReq, registerRes)

        const { req: userReq, res: userRes } = createMocks({
            method: 'POST',
            body: {
                email, password
            }
        })

        await Auth(userReq, userRes)

        const token = userRes._getJSONData().token

        const { req, res } = createMocks({
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const editProfile = jest.fn(async (req: NextApiRequest, res: NextApiResponse) =>
            res.status(200).json({
            name: faker.name.findName()
        }))

        await AuthMiddleware(req, res, editProfile)

        expect(res._getStatusCode()).toBe(200)
    })
})
