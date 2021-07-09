import { NextApiRequest, NextApiResponse } from "next"
import * as Yup from 'yup'
import { prismaClient } from "../../utils/types"
import { createGitHubUser, findUser, findUserByGithubId, findUserById, updatePassword } from "../functions/userFunctions"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config.json'
import { RenderUser } from "../views/UserView"
import axios from 'axios'

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

            await schema.validate({ email, password }, {
                abortEarly: false
            })

        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        const user = await findUser({ email }, this.prisma)

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

        return res.status(200).json({ user: RenderUser(user), token })

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

        const data = {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
            code
        }

        try {

            const response = await axios.post('https://github.com/login/oauth/access_token', data)

            const params = new URLSearchParams(response.data)
            const access_token = params.get('access_token')

            try {
                const userResponse = await axios.get('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${access_token}`
                    }
                })

                const gitHubUser = userResponse.data

                const user = await findUserByGithubId({ id: gitHubUser.id }, this.prisma)

                if(!user) {

                    const newUser = await createGitHubUser({
                        avatar: gitHubUser.avatar_url,
                        githubId: gitHubUser.id,
                        name: gitHubUser.name,
                        type: 'github'
                    }, this.prisma)

                    const token = jwt.sign({ id: newUser.id }, config.key, { expiresIn: '30d' })

                    return res.status(200).json({ user: RenderUser(newUser), token })
                }

                const token = jwt.sign({ id: user.id }, config.key, { expiresIn: '30d' })

                return res.status(200).json({ user: RenderUser(user), token })
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

    async loginByToken(req: NextApiRequest, res: NextApiResponse) {

        const { id } = req.body


        const user = await findUserById({ id }, this.prisma)

        if(!user) {
            return res.status(404).json({
                errors: [
                    'User not found'
                ]
            })
        }

        return res.status(200).json(RenderUser(user))


    }

    async editPassword(req: NextApiRequest, res: NextApiResponse) {

        const { id, password: newPassword } = req.body

        const schema = Yup.string().required('The password is required!')

        try {
            await schema.validate(newPassword)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        const password = await bcrypt.hash(newPassword, 10)

        await updatePassword({ id, password }, this.prisma)

        return res.status(200).send('Password updated successfully')

    }

}

export default AuthController
