import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createComment } from "../functions/commentFunctions"
import { RenderCreatedComment } from "../views/CommentView"

class CommentController {

    private readonly prisma: prismaClient

    constructor(client: prismaClient) {
        this.prisma = client
    }

    async create(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId, postId, content } = req.body

        const schema = Yup.object().shape({
            postId: Yup.number().required('The postId is required!'),
            content: Yup.string().required('The comment content is required!')
        })

        try {
            await schema.validate({ postId, content }, { abortEarly: false })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        const comment = await createComment({ content, postId, userId }, this.prisma)

        return res.status(201).json(RenderCreatedComment(comment))

    }

}

export default CommentController
