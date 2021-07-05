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

        if(!user || !user.password) {
            return res.status(404).json({
                errors: [
                    'User not found'
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

    async loginWithGithub(req: NextApiRequest, res: NextApiResponse) {

        const { code } = req.body

        const schema = Yup.string().required('The code is required!')

        try {
            await schema.validate(code)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        const data = new FormData()
        data.append('client_id', process.env.CLIENT_ID as string)
        data.append('client_secret', process.env.CLIENT_SECRET as string)
        data.append('redirect_uri', process.env.REDIRECT_URI as string)
        data.append('code', code)

        try {

            const response = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                body: data
            })

            const params = new URLSearchParams(await response.text())
            const access_token = params.get('access_token')

            try {
                const userResponse = await fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${access_token}`
                    }
                })

                const user = await userResponse.json()

                return res.status(200).json(user)
            } catch {
                return res.status(401).json({
                    errors: [
                        'Unauthorized'
                    ]
                })
            }


        } catch {
            return res.status(401).json({
                errors: [
                    'Invalid code'
                ]
            })
        }

    }

}

export default AuthController
