import { createUser, findUser } from '../../database/functions/userFunctions'
import { prismaMock } from '../../utils/singleton'
import faker from 'faker'


describe('user', () => {

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

    it('should create an user', async () => {

        prismaMock.user.create.mockResolvedValue(user)

        await expect(createUser(user, prismaMock)).resolves.toEqual(user)

    })

    it('should find an user by his email', async () => {

        const email = faker.internet.email()

        prismaMock.user.findFirst.mockResolvedValue(user)

        await expect(findUser(user, prismaMock)).resolves.toEqual(user)

    })

    it('should return null when there is not an user with the provided email', async () => {

        const email = faker.internet.email()

        prismaMock.user.findFirst.mockResolvedValue(null)

        await expect(findUser(user, prismaMock)).resolves.toEqual(null)

    })
})

