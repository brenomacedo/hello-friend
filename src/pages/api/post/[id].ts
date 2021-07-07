import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../database/client"
import UserController from "../../../database/controllers/UserController"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function PostId(req: NextApiRequest, res: NextApiResponse) {

    const userController = new UserController(client)

    if(req.method === 'PUT') {

        const next = async () => {
            return await userController.edit(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route!'
        ]
    })
}
