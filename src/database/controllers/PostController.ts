import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createPost } from "../functions/postFunctions"
import { renderCreatedPost } from "../views/PostView"

export default class PostController {

    private readonly prisma: prismaClient

    constructor(client: prismaClient) {
        this.prisma = client
    }

    async create(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId, description, imageUrl, categoryId } = req.body

        const schema = Yup.object().shape({
            description: Yup.string().required('The post description is required!'),
            imageUrl: Yup.string(),
            categoryId: Yup.number().required('The categoryId is required!')
        })

        try {
            await schema.validate({ description, imageUrl, categoryId })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const post = await createPost({ categoryId, description, userId, imageUrl }, this.prisma)

            return res.status(200).json(renderCreatedPost(post))
        } catch {
            return res.status(400).json({
                errors: [
                    'Invalid categoryId!'
                ]
            })
        }



    }

}
