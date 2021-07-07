import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../database/client'
import AuthController from '../../../database/controllers/AuthController'

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {

    const authController = new AuthController(client)

    if(req.method === 'POST') {
        return await authController.login(req, res)
    }

    return res.status(405).json({
        errors: [
            'This method are not allowed in ths route!'
        ]
    })

}
