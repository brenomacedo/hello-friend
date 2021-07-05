import { createMocks } from 'node-mocks-http'
import Register from '../../pages/api/user/register'
import prisma from '../../database/client'
import faker from 'faker'

describe('user api', () => {

    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        // setImmediate is not defined (ignore that)
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

        await Register(req, res)

        expect(res._getStatusCode()).toBe(201)

    })

})
