import { createUser } from '../../database/functions/userFunctions'
import { prismaMock } from '../../utils/singleton'
import faker from 'faker'


describe('user', () => {

    it("should create an user", async () => {

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
            resetPasswordTokenExpires: null
        }

        prismaMock.user.create.mockResolvedValue(user)

        await expect(createUser(user, prismaMock)).resolves.toEqual(user)

    })
})

