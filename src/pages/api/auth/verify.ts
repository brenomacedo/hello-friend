import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../database/client"
import AuthController from "../../../database/controllers/AuthController"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function Verify(req: NextApiRequest, res: NextApiResponse) {

    const authController = new AuthController(client)

    if(req.method === 'POST') {
        const next = async () => {
            return await authController.loginByToken(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route!'
        ]
    })

}
