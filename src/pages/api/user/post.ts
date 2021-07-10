import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../database/client"
import PostController from "../../../database/controllers/PostController"
import AuthMiddleware from "../../../database/middlewares/auth"

export default async function UserPost(req: NextApiRequest, res: NextApiResponse) {

    const postController = new PostController(client)

    if(req.method === 'GET') {
        const next = async () => {
            return await postController.indexByUser(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route!'
        ]
    })

}
