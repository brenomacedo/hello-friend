import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../database/client"
import PostController from "../../../database/controllers/PostController"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function PostId(req: NextApiRequest, res: NextApiResponse) {

    const postController = new PostController(client)

    if(req.method === 'PUT') {

        const next = async () => {
            return await postController.edit(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    if(req.method === 'DELETE') {

        const next = async () => {
            return await postController.delete(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route!'
        ]
    })
}
