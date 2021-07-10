import { NextApiRequest, NextApiResponse } from "next"
import client from "../../database/client"
import CategoryController from "../../database/controllers/CategoryController"
import AuthMiddleware from "../../database/middlewares/auth"

export default async function Category(req: NextApiRequest, res: NextApiResponse) {

    const categoryController = new CategoryController(client)

    if(req.method === 'GET') {
        return await categoryController.search(req, res)
    }

    if(req.method === 'POST') {
        const next = async () => {
            return await categoryController.followCategory(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    if(req.method === 'DELETE') {
        const next = async () => {
            return await categoryController.unfollowCategory(req, res)
        }

        return await AuthMiddleware(req, res, next)
    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route!'
        ]
    })

}
