import { Comment, Post, Response, User } from "@prisma/client";
import { RenderComments } from "./CommentView";
import { RenderUser } from "./UserView";

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
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: RenderUser(post.user)
    }

}

export function RenderPost(post: PostWithUser) {

    return {
        id: post.id,
        description: post.description,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
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
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }
}
