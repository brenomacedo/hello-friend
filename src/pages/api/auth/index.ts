import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../database/client'
import AuthController from '../../../database/controllers/AuthController'
import AuthMiddleware from '../../../database/middlewares/auth'

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {

    const authController = new AuthController(client)

    if(req.method === 'POST') {
        return await authController.login(req, res)
    }

    if(req.method === 'PUT') {
        const next = async () => {
            return await authController.editPassword(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    return res.status(405).json({
        errors: [
            'This method are not allowed in ths route!'
        ]
    })

}
