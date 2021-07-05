import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'
import config from  '../../../config.json'

type NextFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<any>

export default async function AuthMiddleware(req: NextApiRequest, res: NextApiResponse, next: NextFunction) {

    const authorization = req.headers.authorization

    if(!authorization) {
        return res.status(401).json({
            errors: [
                'Unauthorized',
                'Token was not provided'
            ]
        })
    }

    if(authorization.split(' ').length !== 2) {
        return res.status(401).json({
            errors: [
                'Unauthorized',
                'Token format invalid'
            ]
        })
    }

    let [bearer, token] = authorization.split(' ')

    if(bearer !== 'Bearer') {
        return res.status(401).json({
            errors: [
                'Unauthorized',
                'Invalid token format'
            ]
        })
    }

    jwt.verify(token, config.key, async (error, decoded) => {
        if(error || !decoded) {
            return res.status(401).json({
                errors: [
                    'Unauthorized',
                    'Invalid token'
                ]
            })
        }

        req.body.id = decoded.id

        return await next(req, res)
    })

}
