import { NextApiRequest, NextApiResponse } from "next"
import * as Yup from 'yup'
import { prismaClient } from "../../utils/types"
import { findUser } from "../functions/userFunctions"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config.json'
import renderUser from "../views/UserView"

class AuthController {

    private readonly prisma: prismaClient

    constructor(
        client: prismaClient
    ) {

        this.prisma = client

    }

    async login(req: NextApiRequest, res: NextApiResponse) {

        const { email, password } = req.body

        const schema = Yup.object().shape({
            email: Yup.string().email('Formato de email inválido!').required(),
            password: Yup.string().required()
        })

        try {

            await schema.validate({ email, password })

        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        const user = await findUser(email, this.prisma)

        if(!user) {
            return res.status(404).json({
                errors: [
                    'User not found'
                ]
            })
        }

        if(user.type === 'github' || !user.password) {
            return res.status(400).json({
                errors: [
                    'This email is signed with a github account!'
                ]
            })
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                errors: [
                    'Email or password are incorrect!'
                ]
            })
        }

        const token = jwt.sign({ id: user.id }, config.key, { expiresIn: '30d' })

        return res.status(200).json({ user: renderUser(user), token })

    }

}

export default AuthController
