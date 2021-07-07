import { NextApiRequest, NextApiResponse } from "next";
import client from "../../database/client";
import CommentController from "../../database/controllers/CommentController";
import AuthMiddleware from "../../database/middlewares/auth";

export default async function Comment(req: NextApiRequest, res: NextApiResponse) {

    const commentController = new CommentController(client)

    if(req.method === 'POST') {

        const next = async () => {
            return await commentController.create(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
