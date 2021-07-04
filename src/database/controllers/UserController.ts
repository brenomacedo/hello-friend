import { Prisma, PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config.json'
import renderUser from "../views/UserView"
import { createUser } from "../functions/userFunctions"

class UserController {

    private readonly prisma: PrismaClient<Prisma.PrismaClientOptions, never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor(
        client: PrismaClient<Prisma.PrismaClientOptions, never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    ) {
        this.prisma = client
    }

    async register(req: NextApiRequest, res: NextApiResponse) {

        const { type, name, email, password: uncryptedPassword } = req.body

        const schema = Yup.object().shape({
            name: Yup.string().required('The name field is required!'),
            email: Yup.string().email('Invalid email!').required('The email is required!'),
            type: Yup.string().required('The type is required!'),
            password: Yup.string().required('The password is required!')
        })

        const password = await bcrypt.hash(uncryptedPassword, 10)

        try {
            await schema.validate({ type, name, email, password }, {
                abortEarly: false
            })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const user = await createUser({ email, name, password, type }, this.prisma)

            const token = jwt.sign({ id: user.id }, config.key, { expiresIn: '30d' })

            return res.status(201).json({
                user: renderUser(user),
                token
            })

        } catch(e) {
            return res.status(409).json({
                errors: [
                    'User already exists!'
                ]
            })
        }

    }

}

export default UserController
