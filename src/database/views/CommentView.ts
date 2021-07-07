import { Comment, User } from "@prisma/client"
import renderUser from "./UserView"

type CommentWithUser = Comment & {
    author: User
}

export function RenderCreatedComment(comment: Comment) {
    return {
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
        userId: comment.userId
    }
}

export function RenderComment(comment: CommentWithUser) {
    return {
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
        userId: comment.userId,
        author: renderUser(comment.author)
    }
}
