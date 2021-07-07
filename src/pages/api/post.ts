import { NextApiRequest, NextApiResponse } from "next"
import client from "../../database/client"
import PostController from "../../database/controllers/PostController"
import AuthMiddleware from "../../database/middlewares/auth"

export default async function Post(req: NextApiRequest, res: NextApiResponse) {

    const postController = new PostController(client)

    if(req.method === 'POST') {
        const next = async () => {
            return await postController.create(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

}
