import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../database/client";
import PostController from "../../../database/controllers/PostController";
import AuthMiddleware from "../../../database/middlewares/auth";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function PostImage(req: NextApiRequest, res: NextApiResponse) {

    const postController = new PostController(client)

    if(req.method === 'POST') {

        const next = async () => {
            return await postController.createImage(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
