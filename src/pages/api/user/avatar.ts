import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import UserController from "../../../database/controllers/UserController";
import client from "../../../database/client";
import AuthMiddleware from "../../../database/middlewares/auth";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function Avatar(req: NextApiRequest, res: NextApiResponse) {

    const userController = new UserController(client)

    if(req.method === 'PUT') {

        const next = async () => {
            return await userController.updateAvatar(req, res)
        }

        return await AuthMiddleware(req, res, next)

    }
}
