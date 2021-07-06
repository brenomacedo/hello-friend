import { NextApiRequest, NextApiResponse } from "next"
import * as Yup from 'yup'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config.json'
import renderUser from "../views/UserView"
import { createUser, deleteUser, editUser, findUserById } from "../functions/userFunctions"
import { prismaClient } from "../../utils/types"
import { followUserCategory, unfollowUserCategory } from "../functions/categoryFunctions"

class UserController {

    private readonly prisma: prismaClient

    constructor(
        client: prismaClient
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

    async edit(req: NextApiRequest, res: NextApiResponse) {

        const { id, name, title, facebook, twitter, instagram, about } = req.body

        const user = await findUserById({ id }, this.prisma)

        if(!user) {
            return res.status(404).json({
                errors: [
                    'User not found!'
                ]
            })
        }

        const updatedUser = await editUser({
            id,
            data: {
                about, facebook, instagram, name, title, twitter
            }
        }, this.prisma)

        return res.status(200).json(renderUser(updatedUser))

    }

    async delete(req: NextApiRequest, res: NextApiResponse) {

        const { id } = req.body

        try {
            await deleteUser({ id }, this.prisma)

            return res.status(200).send('User successfully deleted')
        } catch {
            return res.status(404).json({
                errors: [
                    'User not found'
                ]
            })
        }

    }

    async followCategory(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId, categoryId } = req.body

        const schema = Yup.number().required('The category id is required!')

        try {
            await schema.validate(categoryId)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const relation = await followUserCategory({ categoryId, userId }, this.prisma)
            return res.status(201).json(relation)
        } catch {
            return res.status(409).json({
                errors: [
                    'This category is already being followed by this user'
                ]
            })
        }

    }

    async unfollowCategory(req: NextApiRequest, res: NextApiResponse) {
        const { id: userId, categoryId } = req.body

        const schema = Yup.number().required('The category id is required!')

        try {
            await schema.validate(categoryId)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const relation = await unfollowUserCategory({ categoryId, userId }, this.prisma)

            return res.status(200).json(relation)
        } catch {
            return res.status(409).json({
                errors: [
                    'This category is already not followed by this user!'
                ]
            })
        }
    }

}

export default UserController