import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../../database/controllers/UserController";
import client from "../../../utils/client";

export default async function Register(req: NextApiRequest, res: NextApiResponse) {

    const userController = new UserController(client)

    if(req.method === 'POST') {
        return await userController.register(req, res)
    }

    return res.status(405).json({
        errors: [
            'This method is not allowed in this route'
        ]
    })

}
