import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createPost, deletePost, editPost, listPosts, listPostsByUser } from "../functions/postFunctions"
import { RenderCreatedPost, RenderCreatedPosts, RenderPost, RenderPosts } from "../views/PostView"

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
            await schema.validate({ description, imageUrl, categoryId }, {
                abortEarly: false
            })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const post = await createPost({ categoryId, description, userId, imageUrl }, this.prisma)

            return res.status(201).json(RenderCreatedPost(post))
        } catch {
            return res.status(400).json({
                errors: [
                    'Invalid categoryId!'
                ]
            })
        }

    }

    async index(req: NextApiRequest, res: NextApiResponse) {

        const { categoryId: stringCategoryId } = req.query

        try {

            const categoryId = Number(stringCategoryId) || undefined

            const posts = await listPosts({ categoryId }, this.prisma)

            return res.status(200).json(RenderPosts(posts))
        } catch {
            return res.status(400).json({
                errors: [
                    'Invalid category id, it should be a number!'
                ]
            })
        }

    }

    async indexByUser(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId } = req.body

        const posts = await listPostsByUser({ userId }, this.prisma)

        return res.status(200).json(RenderCreatedPosts(posts))

    }

    async edit(req: NextApiRequest, res: NextApiResponse) {

        const { id: postId } = req.query
        const { description, id: userId } = req.body

        const id = Number(postId) || undefined

        const schema = Yup.object().shape({
            id: Yup.number().required('The post id is required'),
            description: Yup.string().required('The description is required')
        })

        try {
            await schema.validate({ id, description }, { abortEarly: false })
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const post = await editPost({ id: id as any, description, userId }, this.prisma)

            return res.status(200).json(RenderCreatedPost(post))
        } catch {
            return res.status(404).json({
                errors: [
                    'Post not found'
                ]
            })
        }

    }

    async delete(req: NextApiRequest, res: NextApiResponse) {
        const { id: postId } = req.query
        const { id: userId } = req.body

        const id = Number(postId) || undefined

        const schema = Yup.number().required()

        try {
            await schema.validate(id)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            await deletePost({ id: id as any, userId }, this.prisma)
            return res.status(200).send('Deleted successfully')
        } catch {
            return res.status(400).json({
                errors: [
                    'Post not found'
                ]
            })
        }
    }

}
