import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createResponse } from "../functions/responseFunctions"
import { RenderCreatedResponse } from "../views/ResponseView"

class ResponseController {

    private readonly prisma: prismaClient

    constructor(client: prismaClient) {
        this.prisma = client
    }

    async create(req: NextApiRequest, res: NextApiResponse) {

        const { commentId, id: authorId, content } = req.body

        const schema = Yup.object().shape({
            commentId: Yup.number().required('The comment id is required!'),
            content: Yup.string().required('The comment content is required!')
        })

        try {
            await schema.validate({ commentId, content }, { abortEarly: false })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const response = await createResponse({ authorId, commentId, content }, this.prisma)
            return res.status(201).json(RenderCreatedResponse(response))
        } catch {
            return res.status(404).json({
                errors: [
                    'Comment not found'
                ]
            })
        }

    }

}

export default ResponseController
