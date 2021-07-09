import { Comment, Post, Response, User } from "@prisma/client"
import { RenderComments } from "./CommentView"
import { RenderUser } from "./UserView"
import dayjs from 'dayjs'
import 'dayjs/locale/es-us'

type PostWithUser = Post & {
    user: User
    comments?: (Comment & {
        responses: (Response & {
            author: User;
        })[]
        author: User
    })[]
}

export function RenderCreatedPost(post: PostWithUser) {

    return {
        id: post.id,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: dayjs(post.createdAt).format('MMM-D-YYYY HH:mm:ss'),
        updatedAt: dayjs(post.updatedAt).format('MMM-D-YYYY HH:mm:ss'),
        user: RenderUser(post.user)
    }

}

export function RenderPost(post: PostWithUser) {

    return {
        id: post.id,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: dayjs(post.createdAt).format('MMM-D-YYYY HH:mm:ss'),
        updatedAt: dayjs(post.updatedAt).format('MMM-D-YYYY HH:mm:ss'),
        user: RenderUser(post.user),
        comments: RenderComments(post.comments || [])
    }

}

export function RenderPosts(posts: PostWithUser[]) {
    return posts.map(post => RenderPost(post))
}

export function RenderEditedPost(post: Post) {
    return {
        id: post.id,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: dayjs(post.createdAt).format('MMM-D-YYYY HH:mm:ss'),
        updatedAt: dayjs(post.updatedAt).format('MMM-D-YYYY HH:mm:ss')
    }
}
