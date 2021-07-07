import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../database/client"
import ResponseController from "../../../database/controllers/ResponseController"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function Response(req: NextApiRequest, res: NextApiResponse) {

    const responseController = new ResponseController(client)

    if(req.method === 'POST') {

        const next = async () => {
            return await responseController.create(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
