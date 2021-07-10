import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import { followUserCategory, searchCategories, unfollowUserCategory } from "../functions/categoryFunctions"
import * as Yup from 'yup'
import { RenderCategories } from "../views/CategoryView"

class CategoryController {

    private readonly prisma: prismaClient

    constructor(client: prismaClient) {
        this.prisma = client
    }

    async search(req: NextApiRequest, res: NextApiResponse) {
        const { search } = req.query

        const categories = await searchCategories({ search: search as string }, this.prisma)

        return res.status(200).json(RenderCategories(categories))
    }

    async followCategory(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId, categoryId } = req.body

        const schema = Yup.number().required('The category id is required!')

        try {
            await schema.validate(categoryId)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const relation = await followUserCategory({ categoryId, userId }, this.prisma)
            return res.status(201).json(relation)
        } catch {
            return res.status(409).json({
                errors: [
                    'This category is already being followed by this user'
                ]
            })
        }

    }

    async unfollowCategory(req: NextApiRequest, res: NextApiResponse) {
        const { id: userId, categoryId } = req.body

        const schema = Yup.number().required('The category id is required!')

        try {
            await schema.validate(categoryId)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const relation = await unfollowUserCategory({ categoryId, userId }, this.prisma)

            return res.status(200).json(relation)
        } catch {
            return res.status(409).json({
                errors: [
                    'This category is already not followed by this user!'
                ]
            })
        }
    }

}

export default CategoryController
