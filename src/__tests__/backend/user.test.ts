import { createUser, editUser, findUser } from '../../database/functions/userFunctions'
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
        resetPasswordTokenExpires: null,
        githubId: null,
        avatar: null
    }

    it('should create an user', async () => {

        prismaMock.user.create.mockResolvedValue(user)

        await expect(createUser(user, prismaMock)).resolves.toEqual(user)

    })

    it('should find an user by his email', async () => {

        const email = faker.internet.email()

        prismaMock.user.findFirst.mockResolvedValue(user)

        await expect(findUser({ email }, prismaMock)).resolves.toEqual(user)

    })

    it('should return null when there is not an user with the provided email', async () => {

        prismaMock.user.findFirst.mockResolvedValue(null)

        await expect(findUser(user, prismaMock)).resolves.toEqual(null)

    })

    it('should edit an user', async () => {

        prismaMock.user.update.mockResolvedValue(user)

        await expect(editUser({ id: user.id, data: {
            about: faker.random.words(),
            name: faker.name.findName()
        } }, prismaMock)).resolves.toEqual(user)

    })
})

