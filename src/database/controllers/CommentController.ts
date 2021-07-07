import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createComment, deleteComment, editComment } from "../functions/commentFunctions"
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

    async edit(req: NextApiRequest, res: NextApiResponse) {

        const { content, id: userId } = req.body
        const { id: commentId } = req.query

        const id = Number(commentId) | undefined as any

        const schema = Yup.object().shape({
            content: Yup.string().required('The content is required!'),
            id: Yup.number().required('The comment id is required!')
        })

        try {
            await schema.validate({
                content, id
            })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const comment = await editComment({
                id, content, userId
            }, this.prisma)

            return res.status(200).json(RenderCreatedComment(comment))
        } catch(e) {
            return res.status(401).json({
                errors: [
                    'This comment does not exist in your comment list'
                ]
            })
        }

    }

    async delete(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId } = req.body
        const { id: commentId } = req.query

        const id = Number(commentId) | undefined as any

        const schema = Yup.number().required('the comment id is required')

        try {
            await schema.validate(id)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            await deleteComment({ id, userId }, this.prisma)
            return res.status(200).send('Comment successfully deleted')
        } catch(e) {
            return res.status(401).json({
                errors: [
                    'This comment is not yours'
                ]
            })
        }

    }

}

export default CommentController
