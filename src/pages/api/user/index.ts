import { NextApiRequest, NextApiResponse } from "next"
import UserController from "../../../database/controllers/UserController"
import client from "../../../database/client"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function User(req: NextApiRequest, res: NextApiResponse) {

    const userController = new UserController(client)

    if(req.method === 'POST') {
        return await userController.register(req, res)
    }

    if(req.method === 'PUT') {

        const next = async () => {
            return await userController.edit(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    if(req.method === 'DELETE') {

        const next = async () => {
            return await userController.delete(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
