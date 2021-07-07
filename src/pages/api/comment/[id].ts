import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../database/client";
import CommentController from "../../../database/controllers/CommentController";
import AuthMiddleware from "../../../database/middlewares/auth";

export default async function CommentId(req: NextApiRequest, res: NextApiResponse) {

    const commentController = new CommentController(client)

    if(req.method === 'PUT') {

        const next = async () => {
            return await commentController.edit(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    if(req.method === 'DELETE') {

        const next = async () => {
            return await commentController.delete(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
