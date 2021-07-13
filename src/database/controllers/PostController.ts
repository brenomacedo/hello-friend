import { NextApiRequest, NextApiResponse } from "next"
import { prismaClient } from "../../utils/types"
import * as Yup from 'yup'
import { createPost, deletePost, editPost, listPosts, listPostsByUser } from "../functions/postFunctions"
import { RenderCreatedPost, RenderCreatedPosts, RenderPost, RenderPosts } from "../views/PostView"
import formidable from 'formidable'
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'


export default class PostController {

    private readonly prisma: prismaClient

    constructor(client: prismaClient) {
        this.prisma = client
    }

    async create(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId } = req as any
        const { description, imageUrl, categoryId } = req.body

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

    async createImage(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId } = req as any

        const allowedMimetypes = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ]

        const form = new formidable.IncomingForm({
            multiples: false,
            keepExtensions: true,
            uploadDir: './public/post'
        })

        form.on('fileBegin', (formName, file) => {
            const hash = crypto.randomBytes(10).toString('hex')
            file.name = `${hash}-${file.name}`
            file.path = path.resolve('public', 'post', file.name)
        })

        form.on('file', (formName, file) => {
            if(file.size > 2*1024*1024) {
                return res.status(400).json({
                    errors: [
                        'This file is too big, the max size is 2MB'
                    ]
                })
            }

            if(!file.type || !allowedMimetypes.includes(file.type)) {
                return res.status(400).json({
                    errors: [
                        'This file type is not allowed, send an png, jpg or jpeg file!'
                    ]
                })
            }
        })

        const uploadFile = new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if(err) {
                    return reject('An error ocurred')
                }

                return resolve({ fields, image: files.image })
            })
        })

        const image = await Promise.resolve(uploadFile).catch(err => res.status(400).json({
            errors: [
                'Unexpected error'
            ]
        })) as any

        const schema = Yup.object().shape({
            description: Yup.string().required('The post description is required!'),
            imageUrl: Yup.string(),
            categoryId: Yup.number().required('The categoryId is required!')
        })

        try {
            await schema.validate(image.fields)
        } catch(e) {
            return res.status(400).json({
                errors: e.errors
            })
        }

        try {
            const post = await createPost({
                categoryId: Number(image.fields.categoryId),
                description: image.fields.description,
                userId: userId,
                imageUrl: image.image.name
            }, this.prisma)

            return res.status(201).json(post)
        } catch (e) {
            res.status(400).json({
                errors: [
                    'Unexpected error'
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

        const { id: userId } = req as any

        const posts = await listPostsByUser({ userId }, this.prisma)

        return res.status(200).json(RenderCreatedPosts(posts))

    }

    async edit(req: NextApiRequest, res: NextApiResponse) {

        const { id: userId } = req as any
        const { id: postId } = req.query
        const { description } = req.body

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
        const { id: userId } = req as any

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
            const post = await deletePost({ id: id as any, userId }, this.prisma)

            if(post.imageUrl) {
                fs.unlinkSync(path.resolve(process.cwd(), 'public', 'post', post.imageUrl))
            }

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
