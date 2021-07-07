import { Comment, Response, User } from "@prisma/client"
import { RenderResponse, RenderResponses } from "./ResponseView"
import { RenderUser } from "./UserView"

type CommentWithUser = Comment & {
    responses: (Response & {
        author: User;
    })[]
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
        author: RenderUser(comment.author),
        responses: RenderResponses(comment.responses)
    }
}

export function RenderComments(comments: CommentWithUser[]) {
    return comments.map(comment => RenderComment(comment))
}
