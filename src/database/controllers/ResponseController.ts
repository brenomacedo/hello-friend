import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createResponse, deleteResponse, editResponse } from "../functions/responseFunctions"
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

    async edit(req: NextApiRequest, res: NextApiResponse) {

        const { id: authorId, content } = req.body
        const { id: responseId } = req.query

        const id = Number(responseId) || undefined

        const schema = Yup.object().shape({
            id: Yup.number().required('The comment id is required'),
            content: Yup.string().required('The response content is required')
        })

        try {
            await schema.validate({ id, content })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const response = await editResponse({ authorId, content, id: id as any }, this.prisma)
            return res.status(200).json(RenderCreatedResponse(response))
        } catch (e) {
            return res.status(401).json({
                errors: [
                    'This response is not yours'
                ]
            })
        }

    }

    async delete(req: NextApiRequest, res: NextApiResponse) {

        const { id: authorId } = req.body
        const { id: responseId } = req.query

        const id = Number(responseId) || undefined

        const schema = Yup.number().required('The response id is required')

        try {
            await schema.validate(id)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            await deleteResponse({ authorId, id: id as any }, this.prisma)
            return res.status(200).send('Response successfully deleted!')
        } catch {
            return res.status(401).json({
                errors: [
                    'This response is not yours'
                ]
            })
        }

    }

}

export default ResponseController
