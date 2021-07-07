import { Response, User } from "@prisma/client"
import renderUser from "./UserView"

type ResponseWithUser = Response & {
    author: User
}

export function RenderCreatedResponse(response: Response) {
    return {
        id: response.id,
        content: response.content,
        commentId: response.commentId,
        authorId: response.authorId
    }
}

export function RenderResponse(response: ResponseWithUser) {
    return {
        id: response.id,
        content: response.content,
        commentId: response.commentId,
        authorId: response.authorId,
        author: renderUser(response.author)
    }
}
